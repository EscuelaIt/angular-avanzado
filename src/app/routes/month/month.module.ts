import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ControlRoutingModule } from "./month-routing.module";
import { MonthComponent } from "./month.component";
import { ComponentsModule } from "@tools/components/components.module";

import { MonthStore } from "@routes/month/state/month.state";
import { MonthApi } from "@routes/month/state/month-store/month-api.service";
import { JournalApi } from "@routes/month/state/journal-store/journal-api.service";

@NgModule({
	imports: [
		CommonModule,
		ControlRoutingModule,
		ComponentsModule
	],
	declarations: [MonthComponent],
	providers: [MonthApi, JournalApi, MonthStore]
})
export class MonthModule {}
