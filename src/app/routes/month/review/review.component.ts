import { Component, OnInit, OnDestroy } from "@angular/core";
import { MonthBalance } from "@routes/month/state/models/month_balance.model";
import { Subscription } from "rxjs";
import { MonthStore } from "@routes/month/state/month.state";

@Component({
	selector: "ab-review",
	template: `
  <ab-widget-header mode="h2" caption="Review what you do with your incomes of" value="{{monthBalance.incomes}} €"></ab-widget-header>
  <p>
  <main>
    <mat-chip-list>
      <mat-chip color="primary" selected="true">Total Income: {{monthBalance.incomes}} €</mat-chip>
      <mat-chip color="warn" selected="true">Regular Outgoings : {{monthBalance.outgoings}} €</mat-chip>
      <mat-chip color="warn" selected="true">Expenses : {{monthBalance.expenses}} €</mat-chip>
      <mat-chip color="primary" selected="true">Savings : {{monthBalance.savings}} €</mat-chip>
      <mat-chip color="accent" selected="true">Goal : {{monthBalance.goal}} €</mat-chip>
      <mat-chip color="primary" selected="true">Available : {{monthBalance.available}} €</mat-chip>
    </mat-chip-list>
  </main>
  `,
	styles: []
})
export class ReviewComponent implements OnInit, OnDestroy {
	public monthBalanceSubscription: Subscription;
	public monthBalance: MonthBalance;

	constructor(private store: MonthStore) {}

	ngOnInit() {
		this.monthBalanceSubscription = this.store.selectMonthBalance$.subscribe(
			res => (this.monthBalance = res)
		);
	}

	ngOnDestroy(): void {
		this.monthBalanceSubscription.unsubscribe();
	}
}
