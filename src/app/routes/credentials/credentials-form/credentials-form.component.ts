import {
	Component,
	OnInit,
	Output,
	EventEmitter,
	Input,
	ChangeDetectionStrategy,
	OnChanges,
	SimpleChanges
} from "@angular/core";
import {
	FormGroup,
	FormBuilder,
	Validators
} from "@angular/forms";
import { ValidatePassword } from "@tools/components/password-validator";

@Component({
	selector: "ab-credentials-form",
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
  <form *ngIf="form !== undefined" [formGroup]="form" (submit)="submitClick()">
	<mat-card>
	<mat-card-title>
		{{ pageData.title }}
	</mat-card-title>
	<mat-card-content fxLayout="column">
		<mat-form-field>
			<input matInput
						 type="email"
						 placeholder="Email"
						 formControlName="email">
		</mat-form-field>
		<mat-form-field>
			<input matInput
						 type="password"
						 placeholder="Password"
						 formControlName="password">
		</mat-form-field>
	</mat-card-content>
	<mat-card-actions fxFlex="row"
										fxLayoutAlign="flex-end center">
		<button mat-raised-button
						color="primary"
						[disabled]="form.invalid">
			{{ pageData.title }}
		</button>
		<a mat-raised-button
			 mat-primary
			 [routerLink]="['..',pageData.alternate | lowercase]">{{ pageData.alternate }}</a>
	</mat-card-actions>
</mat-card>
  </form>`,
	styles: []
})
export class CredentialsFormComponent
	implements OnInit, OnChanges {
	@Input() public pageData: any;
	@Output() public submitCredentials = new EventEmitter<any>();
	public form: FormGroup;
	constructor(private formBuilder: FormBuilder) {}

	ngOnInit() {}

	ngOnChanges(changes: SimpleChanges): void {
		this.form = this.formBuilder.group({
			email: [
				this.pageData.credential.email,
				[Validators.required, Validators.email]
			],
			password: [
				this.pageData.credential.password,
				[
					Validators.required,
					Validators.minLength(4),
					ValidatePassword
				]
			]
		});
	}

	public submitClick() {
		this.submitCredentials.next(this.form.value);
	}
}
