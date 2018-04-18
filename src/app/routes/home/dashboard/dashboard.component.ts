import {
	Component,
	OnInit,
	ChangeDetectionStrategy,
	Input
} from "@angular/core";
import { MonthBalance } from "@routes/month/state/models/month_balance.model";

@Component({
	selector: "ab-dashboard",
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
  <ab-widget-header mode="h1" caption="Kakebo" value="Monthly balances" ></ab-widget-header>
  <a [routerLink]="['month', year , month]"> Create or view a balance controller for the current month </a>
  <table>
    <thead>
      <tr>
        <th>Year</th>
        <th>Month</th>
        <th>Incoming</th>
        <th>Outgoing</th>
        <th>Expenses</th>
        <th><em>Goal</em></th>
        <th><strong>Savings</strong></th>
        <th>Available</th>
      </tr>
    </thead>
    <tbody>
      <tr *ngFor="let balance of balances" >
        <td><a [routerLink]="['month',balance.year,balance.month]"> {{ balance.year }} </a></td>
        <td><a [routerLink]="['month',balance.year,balance.month]"> {{ balance.month | monthName }}</a></td>
        <td>{{ balance.incomes }}</td>
        <td>{{ balance.outgoings }}</td>
        <td>{{ balance.expenses }}</td>
        <td><em>{{ balance.goal }}</em></td>
        <td><strong>{{ balance.savings }}</strong></td>
        <td>{{ balance.available }}</td>
      </tr>
    </tbody>
  </table>
  `,
	styles: []
})
export class DashboardComponent implements OnInit {
	@Input() public balances: MonthBalance[];
	public year = new Date().getFullYear();
	public month = new Date().getMonth() + 1;

	constructor() {}

	ngOnInit() {}
}
