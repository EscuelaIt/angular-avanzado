import { Component, OnDestroy, OnInit } from "@angular/core";
import { JournalApi } from "@routes/month/state/journal-store/journal-api.service";
import { DeleteJournalEntry, PostJournalEntry } from "@routes/month/state/journal-store/journal-store.actions";
import { JournalEntry } from "@routes/month/state/models/journal_entry.model";
import { MonthBalance } from "@routes/month/state/models/month_balance.model";
import { SavingsGoal } from "@routes/month/state/models/savings_goal.model";
import { SetGoal } from "@routes/month/state/month-store/month-store.actions";
import { MonthStore } from "@routes/month/state/month.state";
import { Subscription } from "rxjs";


@Component({
  selector: "ab-plan",
  template: `
    <ab-widget-header mode="h2" caption="Plan your goal to save" value="{{monthBalance.goal}} €"></ab-widget-header>
    <main >
      <section>
        <section>
          <ab-prevision
            [year]="monthBalance.year"
            [month]="monthBalance.month"
            (saveProjection)="saveNewEntry($event)">
          </ab-prevision>
				</section>
				<section>
					<ab-goal
						*ngIf="monthBalance.incomes>0"
						[monthBalance]="monthBalance"
						(setGoal)="setGoalForMonth($event)">
					</ab-goal>
				</section>
        <section fxLayout="row" fxLayout.lt-md="column" fxLayoutGap="10px" fxLayoutGap.lt-md="0px">
          <ab-incomes fxFlex="50%" fxFlex.lt-md="100%"
            [projectionsToList]="projectedIncomes"
            (deleteProjection)="deleteAnEntry($event)">
          </ab-incomes>
          <ab-outgoings fxFlex="50%" fxFlex.lt-md="100%"
            [projectionsToList]="projectedOutgoings"
            (deleteProjection)="deleteAnEntry($event)">
          </ab-outgoings>
        </section>
      </section>
    <main>
  `,
  styles: []
})
export class PlanComponent implements OnInit, OnDestroy {
  public monthBalanceSubscription: Subscription;
  public projectedIncomesSubscription: Subscription;
  public projectedOutgoingsSubscription: Subscription;
  public projectedIncomes: JournalEntry[];
  public projectedOutgoings: JournalEntry[];
  public monthBalance: MonthBalance;

  constructor(
    private store: MonthStore,
    private journalApi: JournalApi
  ) { }

  ngOnInit() {
    this.monthBalanceSubscription = this.store.selectMonthBalance$.subscribe(
      res => (this.monthBalance = res)
    );
    this.projectedIncomesSubscription = this.store.selectIncomes$.subscribe(
      res => (this.projectedIncomes = res)
    );
    this.projectedOutgoingsSubscription = this.store.selectOutgoings$.subscribe(
      res => (this.projectedOutgoings = res)
    );
  }

  public saveNewEntry(projectedEntry: JournalEntry) {
    this.journalApi
      .postJournalEntry$(projectedEntry)
      .subscribe(res =>
        this.store.dispatchJournal(new PostJournalEntry(res))
      );
  }
  public deleteAnEntry(projectedEntry: JournalEntry) {
    this.journalApi
      .deleteJournalEntry$(projectedEntry)
      .subscribe(res =>
        this.store.dispatchJournal(
          new DeleteJournalEntry(projectedEntry)
        )
      );
  }
  public setGoalForMonth(savingsGoal: SavingsGoal) {
    this.store.dispatchMonth(
      new SetGoal(savingsGoal.goalToSave)
    );
  }

  ngOnDestroy(): void {
    this.monthBalanceSubscription.unsubscribe();
    this.projectedIncomesSubscription.unsubscribe();
    this.projectedOutgoingsSubscription.unsubscribe();
  }
}
