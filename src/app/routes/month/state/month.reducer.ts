import { MonthBalance } from "@routes/month/state/models/month_balance.model";
import { JournalEntry } from "@routes/month/state/models/journal_entry.model";
import { Month } from "@routes/month/state/models/month.model";

export const MonthReducers = {
  reduceYearMonth(state: Month, year: number, month: number): Month {
    let stateClone = { ...state, year, month };
    stateClone = MonthReducers.reduceSetCurrentMonthBalance(stateClone);
    return stateClone;
  },
  reduceGetMonthBalances(state: Month, monthBalances: MonthBalance[]): Month {
    let stateClone = { ...state };
    if (monthBalances) {
      state.monthBalances = monthBalances;
      stateClone = MonthReducers.reduceSetCurrentMonthBalance(state);
    }
    return stateClone;
  },
  reducePostMonthBalance(state: Month, monthBalance: MonthBalance): Month {
    let stateClone = { ...state };
    stateClone.monthBalances = [...stateClone.monthBalances, monthBalance];
    stateClone = MonthReducers.reduceSetCurrentMonthBalance(stateClone);
    return stateClone;
  },
  reducePutMonthBalance(state: Month, monthBalance: MonthBalance): Month {
    let stateClone = { ...state };
    stateClone.monthBalances = stateClone.monthBalances.map(
      m => (m._id === monthBalance._id ? monthBalance : m)
    );
    stateClone = MonthReducers.reduceSetCurrentMonthBalance(stateClone);
    return stateClone;
  },
  reduceSetGoalMonth(state: Month, goal: number): Month {
    const stateClone = { ...state };
    stateClone.monthBalance.goal = goal;
    return stateClone;
  },
  reduceJournalEntries(state: Month, journalEntries: JournalEntry[]): Month {
    let stateClone = { ...state };
    if (journalEntries) {
      stateClone.journalEntries = [...journalEntries];
      return MonthReducers.reduceSetCurrentMonthBalance(stateClone);
    }
    return stateClone;
  },
  reducePostJournalEntry(state: Month, journalEntry: JournalEntry): Month {
    let stateClone = { ...state };
    stateClone.journalEntries = [...stateClone.journalEntries, journalEntry];
    return stateClone;
  },
  reduceDeleteJournalEntry(state: Month, journalEntry: JournalEntry): Month {
    let stateClone = { ...state };
    stateClone.journalEntries = stateClone.journalEntries.filter(
      j => j._id !== journalEntry._id
    );
    return stateClone;
  },

  reduceSetCurrentMonthBalance(state: Month): Month {
    state.monthBalance = state.monthBalances.find(
      m => m.year === state.year && m.month === state.month
    );
    return MonthReducers.calculateMonthBalance(state);
  },
  calculateMonthBalance(state: Month): Month {
    const stateClone = { ...state };
    const mb = stateClone.monthBalance;
    if (mb) {
      if (stateClone.journalEntries) {
        mb.incomes = MonthReducers.sumAmount(
          MonthReducers.filterJournalsByKind(stateClone, "I")
        );
        mb.outgoings = MonthReducers.sumAmount(
          MonthReducers.filterJournalsByKind(stateClone, "O")
        );
        mb.expenses = MonthReducers.sumAmount(
          MonthReducers.filterJournalsByKind(stateClone, "E")
        );
        mb.savings = mb.incomes - mb.outgoings - mb.expenses;
        mb.available = mb.savings - mb.goal;
      }
    }
    return stateClone;
  },
  filterJournalsByKind(state: any, kind: string): JournalEntry[] {
    return state.journalEntries.filter(
      p => p.kind === kind && p.year === state.year && p.month === state.month
    );
  },
  sumAmount(entries: JournalEntry[]): number {
    return entries
      .map(e => e.amount)
      .reduce((state, current) => state + current, 0);
  }
};
