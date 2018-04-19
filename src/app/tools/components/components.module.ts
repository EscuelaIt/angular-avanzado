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
import { FlexLayoutModule } from "@angular/flex-layout";
import {
	MatToolbarModule,
	MatSidenavModule,
	MatButtonModule,
	MatChipsModule,
	MatIconModule,
	MatListModule,
	MatSnackBarModule,
	MatCardModule,
	MatFormFieldModule,
	MatInputModule,
	MatTableModule,
	MatTabsModule,
	MatRadioModule,
	MatDatepickerModule,
	MatNativeDateModule,
	MatSelectModule
} from "@angular/material";
import { SidenavComponent } from "@tools/components/layout/sidenav/sidenav.component";
@NgModule({
	imports: [
		CommonModule,
		RouterModule,
		ReactiveFormsModule,
		FlexLayoutModule,
		MatToolbarModule,
		MatChipsModule,
		MatSidenavModule,
		MatButtonModule,
		MatIconModule,
		MatListModule,
		MatSnackBarModule,
		MatCardModule,
		MatFormFieldModule,
		MatInputModule,
		MatTableModule,
		MatTabsModule,
		MatRadioModule,
		MatDatepickerModule,
		MatNativeDateModule,
		MatSelectModule
	],
	declarations: [
		FooterComponent,
		HeaderComponent,
		MonthNamePipe,
		NavComponent,
		ObjectKeysPipe,
		WidgetHeaderComponent,
		SidenavComponent
	],
	exports: [
		FooterComponent,
		HeaderComponent,
		SidenavComponent,
		MonthNamePipe,
		NavComponent,
		ObjectKeysPipe,
		ReactiveFormsModule,
		WidgetHeaderComponent,
		FlexLayoutModule,
		MatChipsModule,
		MatToolbarModule,
		MatSidenavModule,
		MatButtonModule,
		MatIconModule,
		MatListModule,
		MatSnackBarModule,
		MatCardModule,
		MatFormFieldModule,
		MatInputModule,
		MatTableModule,
		MatTabsModule,
		MatRadioModule,
		MatDatepickerModule,
		MatNativeDateModule,
		MatSelectModule
	]
})
export class ComponentsModule {}
