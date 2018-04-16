import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "@environments/environment";
import { MonthBalance } from "@routes/month/state/models/month_balance.model";

@Component({
  selector: "ab-dashboard",
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
      <tr *ngFor="let balance of balances$ | async" >
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
  public year = new Date().getFullYear();
  public month = new Date().getMonth() + 1;
  public balances$;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    const urlMonthBalances = environment.apiUrl + "priv/monthbalances/";
    this.balances$ = this.http.get<MonthBalance[]>(urlMonthBalances);
  }
}
