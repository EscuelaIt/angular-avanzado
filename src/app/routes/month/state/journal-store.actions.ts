import { Injectable } from "@angular/core";
import { JournalEntry } from "@routes/month/state/models/journal_entry.model";

export enum JournalActions {
	GetJournalEntries = "[Journal] GetJournalEntries",
	PostJournalEntry = "[Journal] PostJournalEntry",
	DeleteJournalEntry = "[Journal] DeleteJournalEntry"
}

export interface JournalAction {
	readonly type: JournalActions;
	readonly payload: any;
}

export class GetJournalEntries implements JournalAction {
	public readonly type = JournalActions.GetJournalEntries;
	constructor(public readonly payload: JournalEntry[]) {}
}

export class PostJournalEntry implements JournalAction {
	public readonly type = JournalActions.PostJournalEntry;
	constructor(public readonly payload: JournalEntry) {}
}

export class DeleteJournalEntry implements JournalAction {
	public readonly type = JournalActions.DeleteJournalEntry;
	constructor(public readonly payload: JournalEntry) {}
}
