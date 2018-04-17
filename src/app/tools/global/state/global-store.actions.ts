import { Injectable } from "@angular/core";

export enum GlobalActions {
	ShowUserMessage = "[Global] ShowUserMessage",
	SetUserToken = "[Global] SetUserToken"
}

export interface Action {
	readonly type: GlobalActions;
	readonly payload: any;
}

export class ShowUserMessage implements Action {
	public readonly type = GlobalActions.ShowUserMessage;
	constructor(public readonly payload: string) {}
}

export class SetUserToken implements Action {
	public readonly type = GlobalActions.SetUserToken;
	constructor(public readonly payload: string) {}
}
