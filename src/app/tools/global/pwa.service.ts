import { Injectable } from "@angular/core";
import { SwUpdate } from "@angular/service-worker";
import { UpdateAvailableEvent } from "@angular/service-worker/src/low_level";

@Injectable()
export class PwaService {
	constructor(private swUpate: SwUpdate) {}

	checkForUpdates() {
		this.swUpate.available.subscribe(
			(event: UpdateAvailableEvent) => {
				const message1 = `Update available: current version is ${
					event.current.hash
				}, available version is ${event.available.hash}.`;
				const message2 = " Would you like to update?";
				const value = confirm(message1 + message2);

				if (value) {
					this.swUpate.checkForUpdate();
				}
			}
		);
	}
}
