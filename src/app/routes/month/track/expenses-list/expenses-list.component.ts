import {
	Component,
	OnInit,
	Output,
	EventEmitter,
	Input,
	SimpleChanges,
	ChangeDetectionStrategy,
	OnChanges
} from "@angular/core";
import { JournalEntry } from "@routes/month/state/models/journal_entry.model";

@Component({
	selector: "ab-expenses-list",
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
  <ab-widget-header mode="h3" caption="Expenses" value="{{ totalAmount }} €"></ab-widget-header>
  <mat-table [dataSource]="expensesToList">
  <ng-container matColumnDef="expenseCategory">
    <mat-header-cell *matHeaderCellDef>Category</mat-header-cell>
    <mat-cell *matCellDef="let expense">{{ expense.expenseCategory | categoryName }}</mat-cell>
  </ng-container>
  <ng-container matColumnDef="description">
    <mat-header-cell *matHeaderCellDef>Description</mat-header-cell>
    <mat-cell *matCellDef="let expense">{{ expense.description }}</mat-cell>
  </ng-container>
  <ng-container matColumnDef="amount">
    <mat-header-cell *matHeaderCellDef>Amount</mat-header-cell>
    <mat-cell *matCellDef="let expense">{{ expense.amount }}</mat-cell>
  </ng-container>
  <ng-container matColumnDef="actions">
    <mat-header-cell *matHeaderCellDef>Actions</mat-header-cell>
    <mat-cell *matCellDef="let expense">
      <button mat-button
              color="primary"
              (click)="delete(expense)">X</button>
    </mat-cell>
  </ng-container>
  <mat-header-row *matHeaderRowDef="columnsToDisplay"></mat-header-row>
  <mat-row *matRowDef="let row; columns: columnsToDisplay"></mat-row>
</mat-table>
  `,
	styles: []
})
export class ExpensesListComponent
	implements OnInit, OnChanges {
	@Input() public expensesToList: JournalEntry[] = [];
	@Output()
	public deleteExpense = new EventEmitter<JournalEntry>();
	public totalAmount: number;
	public columnsToDisplay = [
		"expenseCategory",
		"description",
		"amount",
		"actions"
	];

	constructor() {}

	ngOnInit() {}

	ngOnChanges(changes: SimpleChanges): void {
		if (this.expensesToList) {
			this.totalAmount = this.expensesToList
				.map(p => p.amount)
				.reduce((state, current) => state + current, 0);
		}
	}
	public delete(expense: JournalEntry) {
		this.deleteExpense.emit(expense);
	}
}
