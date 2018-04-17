import { Injectable } from "@angular/core";
import { globalInitialState } from "@tools/global/state/models/global.model";
import { BehaviorSubject, Observable, Subject } from "rxjs";
import { Action } from "@tools/global/state/global-store.actions";
import { globalStoreReducer } from "@tools/global/state/global-store.reducer";

@Injectable()
export class GlobalStore {
	private state = globalInitialState;

	private userMessage$ = new Subject<string>();
	private userToken$ = new BehaviorSubject<string>("");

	constructor() {}

	public selectUserMessage$(): Observable<string> {
		return this.userMessage$.asObservable();
	}

	public selectUserToken$(): Observable<string> {
		return this.userToken$.asObservable();
	}

	public dispatch(action: Action) {
		this.state = globalStoreReducer(this.state, action);
		this.userMessage$.next(this.state.userMessage);
		this.userToken$.next(this.state.userToken);
	}
}
