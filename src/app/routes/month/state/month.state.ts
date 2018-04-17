import { Injectable } from "@angular/core";
import {
	Month,
	monthInitialState
} from "@routes/month/state/models/month.model";
import { BehaviorSubject } from "rxjs";
import { JournalEntry } from "@routes/month/state/models/journal_entry.model";
import { MonthBalance } from "@routes/month/state/models/month_balance.model";
import {
	MonthAction,
	CalculateBalance,
	PostMonthBalance
} from "@routes/month/state/month-store.actions";
import {
	monthStoreReducer,
	filterJournalsByKind
} from "@routes/month/state/month-store.reducer";
import { JournalAction } from "@routes/month/state/journal-store.actions";
import { journalStoreReducer } from "@routes/month/state/journal-store.reducer";
import { MonthBalanceApi } from "@routes/month/state/month-balance-api.service";

@Injectable()
export class MonthStore {
	private state = monthInitialState;

	private monthBalance$ = new BehaviorSubject<MonthBalance>(
		null
	);
	private projectedIncomes$ = new BehaviorSubject<
		JournalEntry[]
	>([]);
	private projectedOutgoings$ = new BehaviorSubject<
		JournalEntry[]
	>([]);
	private expenses$ = new BehaviorSubject<JournalEntry[]>([]);

	public selectMonthBalance$ = this.monthBalance$.asObservable();
	public selectProjectedIncomes$ = this.projectedIncomes$.asObservable();
	public selectProjectedOutgoings$ = this.projectedOutgoings$.asObservable();
	public selectExpenses$ = this.expenses$.asObservable();

	constructor(private monthBalanceApi: MonthBalanceApi) {}

	public dispatchMonth(action: MonthAction) {
		this.state = {
			...this.state,
			monthBalance: monthStoreReducer(
				this.state.monthBalance,
				action
			)
		};
		this.monthBalance$.next(this.state.monthBalance);
	}
	public dispatchJournal(action: JournalAction) {
		this.state = {
			...this.state,
			journalEntries: journalStoreReducer(
				this.state.journalEntries,
				action
			)
		};
		this.projectedIncomes$.next(
			filterJournalsByKind(this.state.journalEntries, "I")
		);
		this.projectedOutgoings$.next(
			filterJournalsByKind(this.state.journalEntries, "O")
		);
		this.expenses$.next(
			filterJournalsByKind(this.state.journalEntries, "E")
		);
		this.dispatchMonth(
			new CalculateBalance(this.state.journalEntries)
		);
		this.monthBalanceApi
			.postMonthBalance$(this.state.monthBalance)
			.subscribe(res =>
				this.dispatchMonth(new PostMonthBalance(res))
			);
	}
}
