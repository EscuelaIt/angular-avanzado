import {
	Component,
	OnInit,
	Input,
	EventEmitter,
	Output,
	OnChanges,
	SimpleChanges,
	ChangeDetectionStrategy
} from "@angular/core";
import { JournalEntry } from "@routes/month/state/models/journal_entry.model";

@Component({
	selector: "ab-incomes",
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
  <ab-widget-header mode="h3" caption="Projected Incomes" value="{{ totalAmount }} €"></ab-widget-header>
  <mat-table [dataSource]="projectionsToList">
    <ng-container matColumnDef="income">
      <mat-header-cell *matHeaderCellDef>Income</mat-header-cell>
      <mat-cell *matCellDef="let projection">{{ projection.description }}</mat-cell>
    </ng-container>
    <ng-container matColumnDef="amount">
      <mat-header-cell *matHeaderCellDef>Amount</mat-header-cell>
      <mat-cell *matCellDef="let projection">{{ projection.amount }}</mat-cell>
    </ng-container>
    <ng-container matColumnDef="actions">
      <mat-header-cell *matHeaderCellDef>Actions</mat-header-cell>
      <mat-cell *matCellDef="let projection">
        <button mat-button
                color="primary"
                (click)="delete(projection)">X</button>
      </mat-cell>
    </ng-container>
    <mat-header-row *matHeaderRowDef="columnsToDisplay"></mat-header-row>
    <mat-row *matRowDef="let row; columns: columnsToDisplay"></mat-row>
  </mat-table>
  `,
	styles: []
})
export class IncomesComponent implements OnInit, OnChanges {
	@Input() public projectionsToList: JournalEntry[] = [];
	@Output()
	public deleteProjection = new EventEmitter<JournalEntry>();
	public totalAmount = 0;
	public columnsToDisplay = ["income", "amount", "actions"];
	constructor() {}

	ngOnInit() {}
	ngOnChanges(changes: SimpleChanges): void {
		if (this.projectionsToList) {
			this.totalAmount = this.projectionsToList
				.map(p => p.amount)
				.reduce((state, current) => state + current, 0);
		}
	}
	public delete(projection: JournalEntry) {
		this.deleteProjection.emit(projection);
	}
}
