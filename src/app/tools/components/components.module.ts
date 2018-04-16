import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { FooterComponent } from "@tools/components/layout/footer/footer.component";
import { HeaderComponent } from "@tools/components/layout/header/header.component";
import { NavComponent } from "@tools/components/layout/nav/nav.component";
import { WidgetHeaderComponent } from "@tools/components/layout/widget-header/widget-header.component";
import { MonthNamePipe } from "@tools/components/month-name.pipe";
import { ObjectKeysPipe } from "@tools/components/object-keys.pipe";

@NgModule({
	imports: [CommonModule, RouterModule, ReactiveFormsModule],
	declarations: [
		FooterComponent,
		HeaderComponent,
		MonthNamePipe,
		NavComponent,
		ObjectKeysPipe,
		WidgetHeaderComponent
	],
	exports: [
		FooterComponent,
		HeaderComponent,
		MonthNamePipe,
		NavComponent,
		ObjectKeysPipe,
		ReactiveFormsModule,
		WidgetHeaderComponent
	]
})
export class ComponentsModule {}
