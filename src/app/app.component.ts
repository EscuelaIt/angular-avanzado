import { Component } from "@angular/core";
import { PwaService } from "@tools/global/pwa.service";
import { GlobalStore } from "@tools/global/state/global-store.state";
import { Observable } from "rxjs";

@Component({
	selector: "ab-root",
	template: `
  <section class="container">
    <ab-header class="row"></ab-header>
    <hr>
    <main>
      <router-outlet ></router-outlet>
    </main>
    <hr>
    <ab-footer class="row" [version]="version$ | async"></ab-footer>
  </section>
  `,
	styles: []
})
export class AppComponent {
	public version$: Observable<string>;
	constructor(
		private pwa: PwaService,
		private global: GlobalStore
	) {
		this.pwa.checkForUpdates();
		this.version$ = this.global.selectAppVersion$;
	}
}
