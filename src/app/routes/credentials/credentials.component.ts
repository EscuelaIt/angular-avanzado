import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { CredentialsService } from "@routes/credentials/credentials.service";
import { GlobalStore } from "@tools/global/state/global-store.state";
import {
	ShowUserMessage,
	SetUserToken
} from "@tools/global/state/global-store.actions";

@Component({
	selector: "ab-login",
	template: `
  <ab-widget-header mode="h1" caption="{{pageData.title}}" value="Wellcome"></ab-widget-header>
  <ab-credentials-form [pageData]="pageData" (submit)="submit($event)" ><ab-credentials-form>
  `,
	providers: [CredentialsService],
	styles: []
})
export class CredentialsComponent implements OnInit {
	public pageData: any;
	constructor(
		private activatedRoute: ActivatedRoute,
		private credentialsService: CredentialsService,
		private router: Router,
		private store: GlobalStore
	) {}

	public ngOnInit() {
		this.obtainPageDataFromRoute();
	}
	private obtainPageDataFromRoute() {
		this.pageData = this.activatedRoute.snapshot.data;
	}
	public submit(credentials) {
		this.store.dispatch(
			new ShowUserMessage("Validating credentials...")
		);
		const service = this.pageData.title;
		this.credentialsService
			.sendCredential(credentials, service)
			.subscribe(
				this.acceptedCredentials,
				this.invalidCredentials
			);
	}
	private acceptedCredentials = responseData => {
		this.store.dispatch(new SetUserToken(responseData.token));
		this.store.dispatch(new ShowUserMessage("Wellcome"));
		this.router.navigateByUrl("/");
	};
	private invalidCredentials = () => {
		this.store.dispatch(new SetUserToken(""));
		this.store.dispatch(new ShowUserMessage("Bad Credentials"));
	};
}
