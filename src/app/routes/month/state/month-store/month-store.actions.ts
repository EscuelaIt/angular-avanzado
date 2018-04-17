import { Injectable } from "@angular/core";
import {
	MonthBalance,
	YearMonth
} from "@routes/month/state/models/month_balance.model";
import { JournalEntry } from "@routes/month/state/models/journal_entry.model";

export enum MonthActions {
	SetYearMonth = "[Month] SetYearMonth",
	SetGoal = "[Month] SetGoal",
	CalculateBalance = "[Month] CalculateBalance",
	GetMonthBalance = "[Month] GetMonthBalance",
	PostMonthBalance = "[Month] PostMonthBalance",
	PutMonthBalance = "[Month] PutMonthBalance"
}

export interface MonthAction {
	readonly type: MonthActions;
	readonly payload: any;
}

export class SetYearMonth implements MonthAction {
	public readonly type = MonthActions.SetYearMonth;
	constructor(public readonly payload: YearMonth) {}
}

export class SetGoal implements MonthAction {
	public readonly type = MonthActions.SetGoal;
	constructor(public readonly payload: number) {}
}

export class CalculateBalance implements MonthAction {
	public readonly type = MonthActions.CalculateBalance;
	constructor(public readonly payload: JournalEntry[]) {}
}

export class GetMonthBalance implements MonthAction {
	public readonly type = MonthActions.GetMonthBalance;
	constructor(public readonly payload: MonthBalance) {}
}

export class PostMonthBalance implements MonthAction {
	public readonly type = MonthActions.PostMonthBalance;
	constructor(public readonly payload: MonthBalance) {}
}

export class PutMonthBalance implements MonthAction {
	public readonly type = MonthActions.PutMonthBalance;
	constructor(public readonly payload: MonthBalance) {}
}
