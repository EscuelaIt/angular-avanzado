import { Injectable } from "@angular/core";
import { SwUpdate } from "@angular/service-worker";
import { UpdateAvailableEvent } from "@angular/service-worker/src/low_level";
import { GlobalStore } from "@tools/global/state/global-store.state";
import {
	SetAppVersion,
	ShowUserMessage
} from "@tools/global/state/global-store.actions";

@Injectable()
export class PwaService {
	constructor(
		private swUpate: SwUpdate,
		private global: GlobalStore
	) {}

	checkForUpdates() {
		this.swUpate.available.subscribe(
			(event: UpdateAvailableEvent) => {
				const currentVersion = { ...event.current };
				const newVersion = { ...event.available };
				this.global.dispatch(
					new SetAppVersion(currentVersion.hash)
				);
				this.global.dispatch(
					new ShowUserMessage("New version vailable")
				);
				const message = `Update available: current version is ${
					currentVersion.hash
				}, available version is ${event.available.hash}.`;
				const question = " Would you like to update?";
				const userResponse = confirm(message + question);

				if (userResponse) {
					this.swUpate.checkForUpdate().then(() => {
						this.global.dispatch(
							new SetAppVersion(newVersion.hash)
						);
						this.global.dispatch(
							new ShowUserMessage("App updated")
						);
					});
				}
			}
		);
	}
}
