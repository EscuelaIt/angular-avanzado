import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ControlRoutingModule } from "./month-routing.module";
import { MonthComponent } from "./month.component";
import { ComponentsModule } from "@tools/components/components.module";

import { MonthStore } from "@routes/month/state/month.state";
import { MonthBalanceApi } from "@routes/month/state/month-balance-api.service";
import { JournalEntryApi } from "@routes/month/state/journal-entry-api.service";

@NgModule({
	imports: [
		CommonModule,
		ControlRoutingModule,
		ComponentsModule
	],
	declarations: [MonthComponent],
	providers: [MonthBalanceApi, JournalEntryApi, MonthStore]
})
export class MonthModule {}
