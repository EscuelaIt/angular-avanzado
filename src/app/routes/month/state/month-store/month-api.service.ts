import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "@environments/environment";
import {
	YearMonth,
	MonthBalance
} from "@routes/month/state/models/month_balance.model";

@Injectable()
export class MonthApi {
	private url = environment.apiUrl + "priv/monthbalances/";

	constructor(private http: HttpClient) {}

	public getMonthBalancesByYearMonth$(
		yearMonth: YearMonth
	): Observable<MonthBalance[]> {
		const url = `${this.url}${yearMonth.year}/${
			yearMonth.month
		}`;
		return this.http.get<MonthBalance[]>(url);
	}

	public postMonthBalance$(
		monthBalance: MonthBalance
	): Observable<MonthBalance> {
		return this.http.post<MonthBalance>(this.url, monthBalance);
	}

	public putMonthBalance$(
		monthBalance: MonthBalance
	): Observable<MonthBalance> {
		const url = `${this.url}${monthBalance._id}`;

		return this.http.put<MonthBalance>(url, monthBalance);
	}
}
