import { Component, OnInit, OnDestroy } from "@angular/core";
import { JournalEntry } from "@routes/month/state/models/journal_entry.model";
import { MonthBalance } from "@routes/month/state/models/month_balance.model";
import { Subscription } from "rxjs";
import { MonthStore } from "@routes/month/state/month.state";
import { JournalApi } from "@routes/month/state/journal-store/journal-api.service";
import {
	PostJournalEntry,
	DeleteJournalEntry
} from "@routes/month/state/journal-store/journal-store.actions";
import { HttpClient } from "@angular/common/http";
import { environment } from "@environments/environment";

@Component({
	selector: "ab-track",
	template: `
    <ab-widget-header mode="h2"
      caption="Track your expenses. Left to expend"
      value="{{monthBalance.available}} €">
    </ab-widget-header>
    <main class="column">
      <section>
        <ab-new-expense
          [year]="monthBalance.year" [month]="monthBalance.month"
          [expenseCategories]="expenseCategories"
          (saveExpense)="saveNewExpense($event)">
        </ab-new-expense>
      </section>
      <section>
        <ab-expenses-list
          [expensesToList]="expenses"
          (deleteExpense)="deleteExpense($event)">
        </ab-expenses-list>
      </section>
    <main>
  `,
	styles: []
})
export class TrackComponent implements OnInit, OnDestroy {
	public monthBalanceSubscription: Subscription;
	public expensesSubscription: Subscription;
	public expenses: JournalEntry[] = [];
	public monthBalance: MonthBalance;
	public expenseCategories = {};
	constructor(
		private store: MonthStore,
		private journalApi: JournalApi,
		private http: HttpClient
	) {}

	ngOnInit() {
		const url =
			environment.apiUrl + "pub/categories/expense_categories";
		this.http.get<any>(url).subscribe(res => {
			this.expenseCategories = res;
		});
		this.monthBalanceSubscription = this.store.selectMonthBalance$.subscribe(
			res => (this.monthBalance = res)
		);
		this.expensesSubscription = this.store.selectExpenses$.subscribe(
			res => (this.expenses = res)
		);
	}
	public saveNewExpense(expense: JournalEntry) {
		this.journalApi
			.postJournalEntry$(expense)
			.subscribe(res => {
				this.store.dispatchJournal(new PostJournalEntry(res));
			});
	}
	public deleteExpense(expense: JournalEntry) {
		this.journalApi
			.deleteJournalEntry$(expense)
			.subscribe(res =>
				this.store.dispatchJournal(
					new DeleteJournalEntry(expense)
				)
			);
	}

	ngOnDestroy(): void {
		this.monthBalanceSubscription.unsubscribe();
		this.expensesSubscription.unsubscribe();
	}
}
