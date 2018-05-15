import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { JournalEntry } from "@routes/month/state/models/journal_entry.model";

@Component({
  selector: "ab-prevision",
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `

	<mat-card>
		<mat-card-title>
			<ab-widget-header mode="h3" caption="Set your Previsions" value=""></ab-widget-header>
		</mat-card-title>
		<form [formGroup]="form"
					(submit)="submit(form.value)">
			<mat-card-content fxLayout="row wrap" fxLayout.lt-md="column">
				<mat-radio-group formControlName="kind" fxFlex="50%" fxFlex.lt-md="100%">
					<mat-radio-button value="I">
						+ Projected Income (Salary, extras)
					</mat-radio-button>
					<mat-radio-button value="O">
						- Regular Outgoing (Mortgage, energy, phone)
					</mat-radio-button>
				</mat-radio-group>
				<mat-form-field fxFlex="50%" fxFlex.lt-md="100%">
					<input matInput
								placeholder="Date"
								formControlName="date"
								[matDatepicker]="datepicker">
					<mat-datepicker-toggle matSuffix
																[for]="datepicker"></mat-datepicker-toggle>
					<mat-datepicker #datepicker></mat-datepicker>
				</mat-form-field>
				<mat-form-field fxFlex="50%" fxFlex.lt-md="100%">
					<input matInput
								placeholder="Description"
								type="text"
								formControlName="description">
				</mat-form-field>
				<mat-form-field fxFlex="50%" fxFlex.lt-md="100%">
					<input matInput
								type="number"
								formControlName="amount">
				</mat-form-field>
			</mat-card-content>
			<mat-card-actions>
				<button mat-raised-button
								color="primary"
								type="submit"
								[disabled]="form.invalid">Save prevision</button>
			</mat-card-actions>
		</form>
	</mat-card>
  `,
  styles: []
})
export class PrevisionComponent implements OnInit {
  @Input() public year: number;
  @Input() public month: number;
  @Output()
  public saveProjection = new EventEmitter<JournalEntry>();
  public form: FormGroup;
  constructor(private formbuilder: FormBuilder) { }

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
