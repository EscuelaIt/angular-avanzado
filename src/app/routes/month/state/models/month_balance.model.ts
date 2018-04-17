export interface MonthBalance {
	_id?: string;
	year: number;
	month: number;
	incomes: number;
	outgoings: number;
	expenses: number;
	savings: number;
	goal: number;
	available: number;
}

export const monthBalanceInitialState: MonthBalance = {
	year: 0,
	month: 0,
	incomes: 0,
	outgoings: 0,
	expenses: 0,
	savings: 0,
	goal: 0,
	available: 0
};

export interface YearMonth {
	year: number;
	month: number;
}
