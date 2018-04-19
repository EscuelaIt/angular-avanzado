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
import {
	FormGroup,
	FormBuilder,
	Validators
} from "@angular/forms";
import { MonthBalance } from "@routes/month/state/models/month_balance.model";
import { SavingsGoal } from "@routes/month/state/models/savings_goal.model";

@Component({
	selector: "ab-goal",
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
  <section *ngIf="monthBalance">
		<mat-card>
			<form [formGroup]="form"
						(submit)="submit(form.value)">
				<mat-card-content>
					<mat-form-field>
						<input matInput
									placeholder="Goal to save"
									type="number"
									formControlName="goalToSave">
						<mat-hint align="start">Max.{{monthBalance?.savings}}</mat-hint>
					</mat-form-field>
				</mat-card-content>
				<mat-card-actions>
					<button mat-raised-button
									color="primary"
									type="submit"
									[disabled]="form.invalid">Save goal</button>
				</mat-card-actions>
			</form>
		</mat-card>
  </section>
  `,
	styles: []
})
export class GoalComponent implements OnInit, OnChanges {
	@Input() public monthBalance: MonthBalance;
	@Output() setGoal = new EventEmitter<SavingsGoal>();
	public form: FormGroup;
	constructor(private formbuilder: FormBuilder) {}

	ngOnInit() {}
	ngOnChanges(changes: SimpleChanges): void {
		if (this.monthBalance) {
			this.resetFormOnChanges();
		}
	}

	private resetFormOnChanges() {
		this.form = this.formbuilder.group({
			goalToSave: [
				this.monthBalance.goal,
				[
					Validators.required,
					Validators.max(this.monthBalance.savings)
				]
			]
		});
	}

	public submit(value) {
		const month_goal: SavingsGoal = {
			year: this.monthBalance.year,
			month: this.monthBalance.month,
			goalToSave: value.goalToSave
		};
		this.setGoal.emit(month_goal);
	}
}
