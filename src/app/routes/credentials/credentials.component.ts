import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { CredentialsService } from "@routes/credentials/credentials.service";
import { SetUserToken, ShowUserMessage } from "@tools/global/state/global-store.actions";
import { GlobalStore } from "@tools/global/state/global-store.state";

@Component({
  selector: "ab-login",
  template: `
  <div fxFlex="50%" fxFlexOffset="25%" fxFlex.lt-md="100%" fxFlexOffset.lt-md="0%">
    <ab-widget-header mode="h1" caption="{{pageData.title}}" value="Wellcome"></ab-widget-header>
    <ab-credentials-form [pageData]="pageData" (submitCredentials)="submitCredentials($event)" ></ab-credentials-form>
  </div>
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
  ) { }

  public ngOnInit() {
    this.obtainPageDataFromRoute();
  }
  private obtainPageDataFromRoute() {
    this.pageData = this.activatedRoute.snapshot.data;
  }
  public submitCredentials(credentials) {
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
  private invalidCredentials = err => {
    this.store.dispatch(new SetUserToken(""));
    this.store.dispatch(new ShowUserMessage("Bad Credentials"));
  };
}
