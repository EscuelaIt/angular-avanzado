import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { ComponentsModule } from "@tools/components/components.module";
import { GlobalModule } from "@tools/global/global.module";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { ServiceWorkerModule } from "@angular/service-worker";
import { environment } from "../environments/environment";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

@NgModule({
	declarations: [AppComponent],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		AppRoutingModule,
		GlobalModule,
		ComponentsModule,
		ServiceWorkerModule.register("/ngsw-worker.js", {
			enabled: environment.production
		})
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule {}
