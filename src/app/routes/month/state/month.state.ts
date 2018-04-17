import { Injectable } from "@angular/core";
import {
	Month,
	monthInitialState
} from "@routes/month/state/models/month.model";
import { BehaviorSubject } from "rxjs";
import { JournalEntry } from "@routes/month/state/models/journal_entry.model";
import { MonthBalance } from "@routes/month/state/models/month_balance.model";
import { MonthApi } from "@routes/month/state/month-store/month-api.service";
import {
	MonthAction,
	MonthActions,
	PutMonthBalance,
	CalculateBalance
} from "@routes/month/state/month-store/month-store.actions";
import {
	monthStoreReducer,
	filterJournalsByKind
} from "@routes/month/state/month-store/month-store.reducer";
import { JournalAction } from "@routes/month/state/journal-store/journal-store.actions";
import { journalStoreReducer } from "@routes/month/state/journal-store/journal-store.reducer";

@Injectable()
export class MonthStore {
	private state = monthInitialState;

	private monthBalance$ = new BehaviorSubject<MonthBalance>(
		null
	);
	private incomes$ = new BehaviorSubject<JournalEntry[]>([]);
	private outgoings$ = new BehaviorSubject<JournalEntry[]>([]);
	private expenses$ = new BehaviorSubject<JournalEntry[]>([]);

	public selectMonthBalance$ = this.monthBalance$.asObservable();
	public selectIncomes$ = this.incomes$.asObservable();
	public selectOutgoings$ = this.outgoings$.asObservable();
	public selectExpenses$ = this.expenses$.asObservable();

	constructor(private monthBalanceApi: MonthApi) {}

	public dispatchMonth(action: MonthAction) {
		console.log(action.type, action.payload);
		this.state = {
			...this.state,
			monthBalance: monthStoreReducer(
				this.state.monthBalance,
				action
			)
		};
		this.monthBalance$.next(this.state.monthBalance);
		if (action.payload === MonthActions.SetGoal) {
			this.monthBalanceApi
				.putMonthBalance$(this.state.monthBalance)
				.subscribe(res =>
					this.dispatchMonth(new PutMonthBalance(res))
				);
		}
	}
	public dispatchJournal(action: JournalAction) {
		console.log(action.type, action.payload);
		this.state = {
			...this.state,
			journalEntries: journalStoreReducer(
				this.state.journalEntries,
				action
			)
		};
		this.incomes$.next(
			filterJournalsByKind(this.state.journalEntries, "I")
		);
		this.outgoings$.next(
			filterJournalsByKind(this.state.journalEntries, "O")
		);
		this.expenses$.next(
			filterJournalsByKind(this.state.journalEntries, "E")
		);
		this.dispatchMonth(
			new CalculateBalance(this.state.journalEntries)
		);
		this.monthBalanceApi
			.putMonthBalance$(this.state.monthBalance)
			.subscribe(res =>
				this.dispatchMonth(new PutMonthBalance(res))
			);
	}
}
