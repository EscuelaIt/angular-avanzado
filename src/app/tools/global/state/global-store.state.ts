import { Injectable } from "@angular/core";
import {
	globalInitialState,
	Global
} from "@tools/global/state/models/global.model";
import { Observable, Subject } from "rxjs";
import {
	Action,
	GlobalActions
} from "@tools/global/state/global-store.actions";
import { globalStoreReducer } from "@tools/global/state/global-store.reducer";

@Injectable()
export class GlobalStore {
	private state: Global;

	private userMessage$ = new Subject<string>();
	private userToken$ = new Subject<string>();
	private appVersion$ = new Subject<string>();

	public selectUserMessage$ = this.userMessage$.asObservable();
	public selectUserToken$ = this.userToken$.asObservable();
	public selectAppVersion$ = this.appVersion$.asObservable();

	constructor() {}

	public dispatch(action: Action): void {
		this.state = globalStoreReducer(this.state, action);
		switch (action.type) {
			case GlobalActions.SetUserToken:
				this.userMessage$.next(this.state.userMessage);
			case GlobalActions.ShowUserMessage:
				this.userToken$.next(this.state.userToken);
			case GlobalActions.SetAppVersion:
				this.appVersion$.next(this.state.appVersion);
		}
	}
}
