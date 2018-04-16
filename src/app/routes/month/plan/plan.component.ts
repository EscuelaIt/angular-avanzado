import { Component, OnInit, Input, OnDestroy } from "@angular/core";

import { SavingsGoal } from "@routes/month/models/savings_goal.model";
import { JournalEntry } from "@routes/month/state/models/journal_entry.model";
import { MonthStore } from "@routes/month/state/month-store.state";
import { MonthBalance } from "@routes/month/state/models/month_balance.model";
import { Subscription } from "rxjs";

@Component({
  selector: "ab-plan",
  template: `
    <ab-widget-header mode="h2" caption="Plan your goal to save" value="{{monthBalance.goal}} €"></ab-widget-header>
    <main class="column">
      <ab-goal *ngIf="monthBalance.incomes>0" class="" [monthBalance]="monthBalance" (setGoal)="setGoalForMonth($event)"></ab-goal>
      <section class="row">
        <section class="column column-40">
          <ab-prevision class="container" [year]="monthBalance.year" [month]="monthBalance.month" (saveProjection)="saveNewEntry($event)"></ab-prevision>
        </section>
        <section class="column column-50 column-offset-10">
          <ab-incomes class="container" 
          [projectionsToList]="projectedIncomes" 
          (deleteProjection)="deleteAnEntry($event)"></ab-incomes>
          <hr>
          <ab-outgoings class="container" 
          [projectionsToList]="projectedOutgoings" 
          (deleteProjection)="deleteAnEntry($event)"></ab-outgoings>
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

  constructor(private store: MonthStore) {}

  ngOnInit() {
    this.monthBalanceSubscription = this.store.selectMonthBalance$.subscribe(
      res => (this.monthBalance = res)
    );
    this.projectedIncomesSubscription = this.store.selectProjectedIncomes$.subscribe(
      res => (this.projectedIncomes = res)
    );
    this.projectedOutgoingsSubscription = this.store.selectProjectedOutgoings$.subscribe(
      res => (this.projectedOutgoings = res)
    );
  }

  public saveNewEntry(projectedEntry: JournalEntry) {
    this.store.dispatchPostJournalEntry(projectedEntry);
  }
  public deleteAnEntry(projectedEntry: JournalEntry) {
    this.store.dispatchDeleteJournalEntry(projectedEntry);
  }
  public setGoalForMonth(savingsGoal: SavingsGoal) {
    this.store.dispatchSetGoalMonth(savingsGoal.goalToSave);
  }

  ngOnDestroy(): void {
    this.monthBalanceSubscription.unsubscribe();
    this.projectedIncomesSubscription.unsubscribe();
    this.projectedOutgoingsSubscription.unsubscribe();
  }
}
