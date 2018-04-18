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
import { environment } from "@environments/environment";
import { HttpClient } from "@angular/common/http";
@Component({
	selector: "ab-new-expense",
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
  <ab-widget-header mode="h3" caption="Record a new Expense"></ab-widget-header>
  <form [formGroup]="form" (submit)="submit(form.value)">
    <fieldset>
      <label for="expenseCategory">Category</label>
      <select id="expenseCategory" formControlName="expenseCategory">
        <option *ngFor="let expenseCategory of expenseCategories | objectKeys" [value]="expenseCategory">{{ expenseCategory | categoryName }}</option>
      </select>
      <label for="date">Date</label>
      <input type="date" formControlName="date">
      <label for="description">Description</label>
      <input type="text" formControlName="description">
      <label for="amount">Amount</label>
      <input type="number" formControlName="amount">
      <input class="button-primary" type="submit" value="Save Expense" [disabled]="form.invalid" >
    </fieldset>
  </form>
  `,
	styles: []
})
export class NewExpenseComponent implements OnInit {
	@Input() public year: number;
	@Input() public month: number;
	@Output() saveExpense = new EventEmitter<JournalEntry>();
	public expenseCategories = [];
	public form: FormGroup;
	constructor(
		private formbuilder: FormBuilder,
		private http: HttpClient
	) {}

	ngOnInit() {
		const urlExpenseCategories =
			environment.apiUrl + "pub/categories/expense_categories";
		this.http
			.get<string[]>(urlExpenseCategories)
			.subscribe(res => (this.expenseCategories = res));
		this.form = this.formbuilder.group({
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
