import {
	MonthBalance,
	monthBalanceInitialState
} from "@routes/month/state/models/month_balance.model";
import { JournalEntry } from "@routes/month/state/models/journal_entry.model";
import {
	MonthAction,
	MonthActions
} from "@routes/month/state/month-store/month-store.actions";

export function monthStoreReducer(
	state = monthBalanceInitialState,
	action: MonthAction
): MonthBalance {
	switch (action.type) {
		case MonthActions.SetYearMonth:
			return {
				...state,
				year: action.payload.year,
				month: action.payload.month
			};
		case MonthActions.SetGoal:
			const setGoal = { ...state, goal: action.payload };
			setGoal.available = setGoal.savings - setGoal.goal;
			return setGoal;
		case MonthActions.CalculateBalance:
			const calculateBalance = { ...state };
			calculateBalance.incomes = sumAmount(
				filterJournalsByKind(action.payload, "I")
			);
			calculateBalance.outgoings = sumAmount(
				filterJournalsByKind(action.payload, "O")
			);
			calculateBalance.expenses = sumAmount(
				filterJournalsByKind(action.payload, "E")
			);
			calculateBalance.savings =
				calculateBalance.incomes -
				calculateBalance.outgoings -
				calculateBalance.expenses;
			calculateBalance.available =
				calculateBalance.savings - calculateBalance.goal;
			calculateBalance.available =
				calculateBalance.savings - calculateBalance.goal;
			return calculateBalance;
		case MonthActions.GetMonthBalance:
			return action.payload;
		case MonthActions.PutMonthBalance:
			return action.payload;
		default:
			return state;
	}
}

export function filterJournalsByKind(
	journalEntries: JournalEntry[],
	kind: string
): JournalEntry[] {
	return journalEntries.filter(p => p.kind === kind);
}

export function sumAmount(entries: JournalEntry[]): number {
	return entries
		.map(e => e.amount)
		.reduce((state, current) => state + current, 0);
}
