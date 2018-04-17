export interface JournalEntry {
	_id?: string;
	year: number;
	month: number;
	day: number;
	date?: Date;
	kind: "I" | "O" | "E";
	expenseCategory?: "G" | "L" | "C" | "E";
	description?: string;
	amount: number;
}

export const journalEntriesInitialState = [];
