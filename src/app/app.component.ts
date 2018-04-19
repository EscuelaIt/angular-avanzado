import { Component, ViewChild } from "@angular/core";
import { PwaService } from "@tools/global/pwa.service";
import { GlobalStore } from "@tools/global/state/global-store.state";
import { Observable } from "rxjs";
import { MatSidenav, MatSnackBar } from "@angular/material";

@Component({
	selector: "ab-root",
	templateUrl: "./app.component.html",
	styles: []
})
export class AppComponent {
	public version$: Observable<string>;
	@ViewChild("sidenav") sidenav: MatSidenav;

	constructor(
		private pwa: PwaService,
		private global: GlobalStore
	) {
		this.pwa.checkForUpdates();
		this.version$ = this.global.selectAppVersion$;
	}

	onToggleSidenav() {
		this.sidenav.toggle();
	}

	closeSidenav() {
		if (this.sidenav.opened) {
			this.sidenav.close();
		}
	}
}
