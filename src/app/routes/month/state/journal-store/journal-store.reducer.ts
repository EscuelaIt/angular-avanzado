import {
	JournalEntry,
	journalEntriesInitialState
} from "@routes/month/state/models/journal_entry.model";
import {
	JournalAction,
	JournalActions
} from "@routes/month/state/journal-store/journal-store.actions";

export function journalStoreReducer(
	state = journalEntriesInitialState,
	action: JournalAction
): JournalEntry[] {
	switch (action.type) {
		case JournalActions.GetJournalEntries:
			return action.payload;
		case JournalActions.PostJournalEntry:
			return [...state, action.payload];
		case JournalActions.DeleteJournalEntry:
			return state.filter(je => je._id !== action.payload._id);
		default:
			return state;
	}
}
