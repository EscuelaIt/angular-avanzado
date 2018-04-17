import { Component, OnInit } from "@angular/core";
import { GlobalStore } from "@tools/global/state/global-store.state";
import { Observable } from "rxjs";

@Component({
	selector: "ab-header",
	template: `
    <header class="container">
      <a class="button button-clear" routerLink="">Kakebo</a>
      <a class="button button-clear" routerLink="about">About</a>
      <a *ngIf="isAnonymous;else welcome" class="button button-clear" routerLink="credentials/login">Login</a>
      <ng-template #welcome>Hello</ng-template>
      <span [ngClass]="['float-right']">{{ message$ | async }}</span>
    </header>
  `,
	styles: []
})
export class HeaderComponent implements OnInit {
	public isAnonymous = true;
	public message$: Observable<string>;
	constructor(private store: GlobalStore) {}

	ngOnInit() {
		this.store.selectUserToken$.subscribe(
			(res: string) => (this.isAnonymous = res === "")
		);
		this.message$ = this.store.selectUserMessage$;
	}
}
