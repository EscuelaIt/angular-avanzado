import { CommonModule } from "@angular/common";
import {
	HTTP_INTERCEPTORS,
	HttpClientModule
} from "@angular/common/http";
import { NgModule } from "@angular/core";
import { CatchInterceptorService } from "@tools/global/interceptors/catch-interceptor.service";
import { TokenInterceptorService } from "@tools/global/interceptors/token-interceptor.service";
import { GlobalStore } from "@tools/global/state/global-store.state";

@NgModule({
	imports: [CommonModule, HttpClientModule],
	providers: [
		GlobalStore,
		{
			provide: HTTP_INTERCEPTORS,
			useClass: TokenInterceptorService,
			multi: true
		},
		{
			provide: HTTP_INTERCEPTORS,
			useClass: CatchInterceptorService,
			multi: true
		}
	]
})
export class GlobalModule {}
