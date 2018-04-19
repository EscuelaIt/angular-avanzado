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
<section>
  <ab-widget-header mode="h1"
                     caption="Kakebo"
                     value="Monthly balances"></ab-widget-header>
  <a mat-button
     color="primary"
     [routerLink]="['month', year , month]"> Create or view a balance controller for the current month </a>
  <mat-table #table
             [dataSource]="balances">
    <ng-container matColumnDef="year">
      <mat-header-cell *matHeaderCellDef>Year</mat-header-cell>
      <mat-cell *matCellDef="let element"><a [routerLink]="['month',element.year,element.month]">{{element.year}}</a></mat-cell>
    </ng-container>
    <ng-container matColumnDef="month">
      <mat-header-cell *matHeaderCellDef>Month</mat-header-cell>
      <mat-cell *matCellDef="let element"><a [routerLink]="['month',element.year,element.month]">{{ element.month }}</a></mat-cell>
    </ng-container>
    <ng-container matColumnDef="incoming">
      <mat-header-cell *matHeaderCellDef>Incomings</mat-header-cell>
      <mat-cell *matCellDef="let element">{{ element.incomes }}</mat-cell>
    </ng-container>
    <ng-container matColumnDef="outgoing">
      <mat-header-cell *matHeaderCellDef>Outgoing</mat-header-cell>
      <mat-cell *matCellDef="let element">{{ element.outgoings }}</mat-cell>
    </ng-container>
    <ng-container matColumnDef="expenses">
      <mat-header-cell *matHeaderCellDef>Expenses</mat-header-cell>
      <mat-cell *matCellDef="let element">{{ element.expenses }}</mat-cell>
    </ng-container>
    <ng-container matColumnDef="goal">
      <mat-header-cell *matHeaderCellDef>Goal</mat-header-cell>
      <mat-cell *matCellDef="let element">{{ element.goal }}</mat-cell>
    </ng-container>
    <ng-container matColumnDef="savings">
      <mat-header-cell *matHeaderCellDef>Savings</mat-header-cell>
      <mat-cell *matCellDef="let element">{{ element.savings }}</mat-cell>
    </ng-container>
    <ng-container matColumnDef="available">
      <mat-header-cell *matHeaderCellDef>Available</mat-header-cell>
      <mat-cell *matCellDef="let element">{{ element.available }}</mat-cell>
    </ng-container>
    <mat-header-row *matHeaderRowDef="displayedColumns"></mat-header-row>
    <mat-row *matRowDef="let row; columns: displayedColumns;"></mat-row>
  </mat-table>
</section>
  `,
	styles: []
})
export class DashboardComponent implements OnInit {
	@Input() public balances: MonthBalance[];
	public displayedColumns = [
		"year",
		"month",
		"incoming",
		"outgoing",
		"expenses",
		"goal",
		"savings",
		"available"
	];
	public year = new Date().getFullYear();
	public month = new Date().getMonth() + 1;

	constructor() {}

	ngOnInit() {}
}
