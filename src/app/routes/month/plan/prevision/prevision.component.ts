import {
	Component,
	OnInit,
	EventEmitter,
	Output,
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
	selector: "ab-prevision",
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
  <ab-widget-header mode="h3" caption="Set your Previsions" value=""></ab-widget-header>
  <form [formGroup]="form" (submit)="submit(form.value)">
    <fieldset>
      <label for="kind">Kind of prevision</label>
      <input type="radio" name="kind" formControlName="kind" value="I"> + Projected Income: <small>Salary, extras</small><br>
      <input type="radio" name="kind" formControlName="kind" value="O"> - Regular Outgoing: <small>Mortgage, energy, phone</small><br>
      <label for="date">Date</label>
      <input type="date" formControlName="date">
      <label for="description">Description</label>
      <input type="text" formControlName="description">
      <label for="amount">Amount</label>
      <input type="number" formControlName="amount">
      <input class="button-primary" type="submit" value="Save Prevision" [disabled]="form.invalid">
    </fieldset>
  </form>
  `,
	styles: []
})
export class PrevisionComponent implements OnInit {
	@Input() public year: number;
	@Input() public month: number;
	@Output()
	public saveProjection = new EventEmitter<JournalEntry>();
	public form: FormGroup;
	constructor(private formbuilder: FormBuilder) {}

	ngOnInit() {
		this.form = this.formbuilder.group({
			kind: [null, Validators.required],
			date: [this.getSafeDate()],
			description: "",
			amount: [0, Validators.required]
		});
	}

	public submit(newProjection) {
		newProjection.year = this.year;
		newProjection.month = this.month;
		newProjection.day = this.getSafeDay(newProjection.date);
		this.saveProjection.emit(newProjection);
		this.form.reset({
			amount: 0,
			date: this.getSafeDate()
		});
	}

	private getSafeDate = (): string =>
		new Date(this.year, this.month - 1, 1, 12, 0, 0)
			.toISOString()
			.substring(0, 10);
	private getSafeDay = (date: Date): number =>
		new Date(date).getDay();
}
