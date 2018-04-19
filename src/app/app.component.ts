import { Component, ViewChild } from "@angular/core";
import { PwaService } from "@tools/global/pwa.service";
import { GlobalStore } from "@tools/global/state/global-store.state";
import { Observable } from "rxjs";
import { MatSidenav, MatSnackBar } from "@angular/material";
import {
	Router,
	RouterEvent,
	NavigationStart
} from "@angular/router";
import { filter } from "rxjs/operators";

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
		private global: GlobalStore,
		private router: Router,
		private snackbar: MatSnackBar
	) {
		this.listenToVersionUpdates();
		this.listenToRouterEvents();
		this.listenToMessages();
	}

	private listenToVersionUpdates() {
		this.pwa.checkForUpdates();
		this.version$ = this.global.selectAppVersion$;
	}

	listenToRouterEvents() {
		this.router.events
			.pipe(
				filter(
					(event: RouterEvent) =>
						event instanceof NavigationStart
				)
			)
			.subscribe((event: RouterEvent) => {
				this.closeSidenav();
			});
	}

	listenToMessages() {
		this.global.selectUserMessage$.subscribe(
			(message: string) => {
				if (message) {
					this.snackbar.open(message, "Close", {
						duration: 3000
					});
				}
			}
		);
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
