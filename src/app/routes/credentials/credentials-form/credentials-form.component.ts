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
    <label for="email">Email</label>
    <input name="email"
      formControlName="email"
      type="email"/>
    <label for="password">Password</label>
    <input name="password"
      formControlName="password"
      type="password"/>
    <span *ngIf="form?.get('password')?.invalid">password error</span>
    <input class="button-primary"
      type="submit"
      [value]="pageData?.title"
      [disabled]="form.invalid">
    <a class="button button-clear"
      [routerLink]="['..',pageData?.alternate | lowercase]">
      {{ pageData?.alternate }}
    </a>
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
