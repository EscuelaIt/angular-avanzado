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
