import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { CredentialsService } from "@routes/credentials/credentials.service";
import {
	FormGroup,
	FormBuilder,
	Validators
} from "@angular/forms";
import { GlobalStore } from "@tools/global/state/global-store.state";

@Component({
	selector: "ab-login",
	template: `
  <ab-widget-header mode="h1" caption="{{pageData.title}}" value="Wellcome"></ab-widget-header>
  <form [formGroup]="form" (submit)="submit(form.value)">
    <label for="email">Email</label>
    <input name="email"
      formControlName="email"
      type="email"/>
    <label for="password">Password</label>
    <input name="password"
      formControlName="password"
      type="password"/>
    <input class="button-primary" type="submit" [value]="pageData.title" [disabled]="form.invalid">
    <a class="button button-clear" [routerLink]="['..',pageData.alternate | lowercase]">{{ pageData.alternate }}</a>
  </form>
  `,
	providers: [CredentialsService],
	styles: []
})
export class CredentialsComponent implements OnInit {
	public pageData: any;
	public form: FormGroup;
	constructor(
		private activatedRoute: ActivatedRoute,
		private credentialsService: CredentialsService,
		private router: Router,
		private store: GlobalStore,
		private formbuilder: FormBuilder
	) {}

	public ngOnInit() {
		this.obtainPageDataFromRoute();
	}
	private obtainPageDataFromRoute() {
		this.pageData = this.activatedRoute.snapshot.data;
		this.form = this.formbuilder.group({
			email: [
				this.pageData.credential.email,
				[Validators.required, Validators.email]
			],
			password: [
				this.pageData.credential.password,
				[Validators.required, Validators.minLength(4)]
			]
		});
	}
	public submit(credentials) {
		this.store.dispatchUserMessage("Validating credentials...");
		const service = this.pageData.title;
		this.credentialsService
			.sendCredential(credentials, service)
			.subscribe(
				this.acceptedCredentials,
				this.invalidCredentials
			);
	}
	private acceptedCredentials = responseData => {
		this.store.dispatchUserToken(responseData.token);
		this.store.dispatchUserMessage("Wellcome");
		this.router.navigateByUrl("/");
	};
	private invalidCredentials = () => {
		this.store.dispatchUserToken("");
		this.store.dispatchUserMessage("Invalid Credentials");
	};
}
