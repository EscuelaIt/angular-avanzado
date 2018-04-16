import {
	HttpEvent,
	HttpHandler,
	HttpInterceptor,
	HttpRequest
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { GlobalStore } from "@tools/global/state/global-store.state";
import { Observable } from "rxjs";

@Injectable()
export class TokenInterceptorService
	implements HttpInterceptor {
	private token: string = "";

	constructor(private store: GlobalStore) {
		this.subscribeToTokenChanges();
	}

	private subscribeToTokenChanges() {
		this.store.selectUserToken$().subscribe(this.setToken);
	}

	private setToken = (token: string) => (this.token = token);

	public intercept(
		req: HttpRequest<any>,
		next: HttpHandler
	): Observable<HttpEvent<any>> {
		const authorizedReq = this.setAuthHeader(req);
		const handledRequest = next.handle(authorizedReq);
		return handledRequest;
	}
	private setAuthHeader(
		req: HttpRequest<any>
	): HttpRequest<any> {
		const authToken = `Bearer ${this.token}`;
		const headers = req.headers.set("Authorization", authToken);
		const authorizedReq = req.clone({ headers });
		return authorizedReq;
	}
}
