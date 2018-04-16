import { Component, OnInit } from "@angular/core";
import { GlobalStore } from "@tools/global/state/global-store.state";

@Component({
	selector: "ab-header",
	template: `
    <header>
      <a class="button button-clear" routerLink="">Kakebo</a>
      <a class="button button-clear" routerLink="about">About</a>
      <a *ngIf="userIsAnonymous;else wellcome" class="button button-clear" routerLink="credentials/login">Login</a>
      <ng-template #wellcome>Hello !</ng-template>
    </header>
    
  `,
	styles: []
})
export class HeaderComponent implements OnInit {
	public userIsAnonymous;
	constructor(private store: GlobalStore) {}

	ngOnInit() {
		this.store
			.selectUserToken$()
			.subscribe(
				(res: string) => (this.userIsAnonymous = res === "")
			);
	}
}
