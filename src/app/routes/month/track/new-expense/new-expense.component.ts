import {
	Component,
	OnInit,
	Output,
	EventEmitter,
	ChangeDetectionStrategy,
	Input
} from "@angular/core";
import {
	FormGroup,
	FormBuilder,
	Validators
} from "@angular/forms";
import { JournalEntry } from "@routes/month/state/models/journal_entry.model";
@Component({
	selector: "ab-new-expense",
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
	<mat-card>
  <mat-card-title>
		<ab-widget-header mode="h3" caption="Record a new Expense"></ab-widget-header>
  </mat-card-title>
  <form [formGroup]="form" (submit)="submit(form.value)">
	<mat-card-content fxLayout="column">
	<mat-form-field>
		<mat-select formControlName="expenseCategory"
								placeholder="Expense category">
			<mat-option *ngFor="let expenseCategory of expenseCategories | objectKeys"
									[value]="expenseCategory">
				{{ expenseCategory | categoryName }}
			</mat-option>
		</mat-select>
	</mat-form-field>
	<mat-form-field>
		<input formControlName="date"
					 matInput
					 [matDatepicker]="picker"
					 placeholder="Date">
		<mat-datepicker-toggle matSuffix
													 [for]="picker"></mat-datepicker-toggle>
		<mat-datepicker #picker></mat-datepicker>
	</mat-form-field>
	<mat-form-field>
		<input matInput
					 type="number"
					 formControlName="amount"
					 placeholder="Amount">
	</mat-form-field>
	<mat-form-field>
		<input matInput
					 type="text"
					 placeholder="Description"
					 formControlName="description">
	</mat-form-field>
</mat-card-content>
<mat-card-actions>
	<button mat-raised-button
					color="primary"
					type="submit"
					[disabled]="form.invalid">Save expense</button>
</mat-card-actions>
  </form>
  `,
	styles: []
})
export class NewExpenseComponent implements OnInit {
	@Input() public year: number;
	@Input() public month: number;
	@Output() saveExpense = new EventEmitter<JournalEntry>();
	@Input() public expenseCategories = {};
	public form = this.formBuilder.group({});
	constructor(private formBuilder: FormBuilder) {}

	ngOnInit() {
		this.form = this.formBuilder.group({
			expenseCategory: [null, Validators.required],
			date: this.getSafeDate(),
			description: "",
			amount: [0, [Validators.required, Validators.min(0)]]
		});
	}

	public submit(expense: any) {
		expense.kind = "E";
		expense.year = this.year;
		expense.month = this.month;
		expense.day = this.getSafeDay(expense.date);
		this.saveExpense.emit(expense);
	}

	private getSafeDate = (): string =>
		new Date(this.year, this.month - 1, 1, 12, 0, 0)
			.toISOString()
			.substring(0, 10);
	private getSafeDay = (date: Date): number =>
		new Date(date).getDay();
}
