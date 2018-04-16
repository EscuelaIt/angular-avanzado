import { Injectable } from "@angular/core";
import { globalInitialState } from "@tools/global/state/models/global.model";
import { BehaviorSubject, Observable, Subject } from "rxjs";

@Injectable()
export class GlobalStore {
	private state = globalInitialState;

	private userMessage$ = new Subject<string>();
	private userToken$ = new BehaviorSubject<string>("");

	constructor() {}

	public selectUserMessage$(): Observable<string> {
		return this.userMessage$.asObservable();
	}
	public dispatchUserMessage(userMessage: string): void {
		this.state.userMessage = userMessage;
		this.userMessage$.next(this.state.userMessage);
	}
	public selectUserToken$(): Observable<string> {
		return this.userToken$.asObservable();
	}
	public dispatchUserToken(userToken: string): void {
		this.state.userToken = userToken;
		this.userToken$.next(this.state.userToken);
	}
}
