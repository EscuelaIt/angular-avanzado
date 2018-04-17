import { MonthBalance } from "@routes/month/state/models/month_balance.model";
import { JournalEntry } from "@routes/month/state/models/journal_entry.model";

export interface Month {
	journalEntries: JournalEntry[];
	monthBalance: MonthBalance;
}

export const monthInitialState = {
	journalEntries: [],
	monthBalance: null
};
