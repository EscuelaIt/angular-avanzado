import { CommonModule } from "@angular/common";
import {
	HTTP_INTERCEPTORS,
	HttpClientModule
} from "@angular/common/http";
import { NgModule } from "@angular/core";
import { CatchInterceptorService } from "@tools/global/catch-interceptor.service";
import { GlobalStore } from "@tools/global/state/global-store.state";
import { TokenInterceptorService } from "@tools/global/token-interceptor.service";

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
