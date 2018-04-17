import { Component, OnInit, OnDestroy } from "@angular/core";
import { MonthBalance } from "@routes/month/state/models/month_balance.model";
import { Subscription } from "rxjs";
import { MonthStore } from "@routes/month/state/month.state";

@Component({
	selector: "ab-review",
	template: `
  <ab-widget-header mode="h2" caption="Review what you do with your incomes of" value="{{monthBalance.incomes}} €"></ab-widget-header>
  <main>
    <dd>
      <dt>Total Income</dt>
      <dd><strong>{{monthBalance.incomes}} €</strong></dd>
    <dl>
      <dt>Regular Outgoings</dt>
      <dd><strong>{{monthBalance.outgoings}} €</strong></dd>
    </dl>
    <dl>
      <dt>Expenses</dt>
      <dd><strong>{{monthBalance.expenses}} €</strong></dd>
    </dl>
    <dl>
      <dt>Savings</dt>
      <dd><strong>{{monthBalance.savings}} €</strong></dd>
    </dl>
    <dl>
      <dt>Goal</dt>
      <dd><strong>{{monthBalance.goal}} €</strong></dd>
    </dl>
    <dl>
      <dt>Available</dt>
      <dd><strong>{{monthBalance.available}} €</strong></dd>
    </dl>
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
