import { Injectable } from "@angular/core";
import {
	globalInitialState,
	Global
} from "@tools/global/state/models/global.model";
import { Observable, Subject } from "rxjs";
import { Action } from "@tools/global/state/global-store.actions";
import { globalStoreReducer } from "@tools/global/state/global-store.reducer";

@Injectable()
export class GlobalStore {
	private state: Global;

	private userMessage$ = new Subject<string>();
	private userToken$ = new Subject<string>();

	public selectUserMessage$ = (): Observable<string> =>
		this.userMessage$.asObservable();
	public selectUserToken$ = (): Observable<string> =>
		this.userToken$.asObservable();

	constructor() {}

	public dispatch(action: Action) {
		this.state = globalStoreReducer(this.state, action);
		this.userMessage$.next(this.state.userMessage);
		this.userToken$.next(this.state.userToken);
	}
}
