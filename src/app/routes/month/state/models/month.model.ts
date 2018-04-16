import { MonthBalance } from "@routes/month/state/models/month_balance.model";
import { JournalEntry } from "@routes/month/state/models/journal_entry.model";

export interface Month {
  monthBalances: MonthBalance[];
  journalEntries: JournalEntry[];
  year: number;
  month: number;
  monthBalance: MonthBalance;
}

export const monthInitialState = {
  monthBalances: [],
  journalEntries: [],
  year: 0,
  month: 0,
  monthBalance: null
};
