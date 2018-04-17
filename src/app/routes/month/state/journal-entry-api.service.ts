import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "@environments/environment";
import { YearMonth } from "@routes/month/state/models/month_balance.model";
import { JournalEntry } from "@routes/month/state/models/journal_entry.model";

@Injectable()
export class JournalEntryApi {
	private url = environment.apiUrl + "priv/journalentries/";

	constructor(private http: HttpClient) {}

	public getJournalEntriesByYearMonth$(
		yearMonth: YearMonth
	): Observable<JournalEntry[]> {
		const url = `${this.url}${yearMonth.year}/${
			yearMonth.month
		}`;
		return this.http.get<JournalEntry[]>(url);
	}

	public postJournalEntry$(
		journalEntry: JournalEntry
	): Observable<JournalEntry> {
		return this.http.post<JournalEntry>(this.url, journalEntry);
	}

	public deleteJournalEntry$(
		journalEntry: JournalEntry
	): Observable<any> {
		const url = `${this.url}${journalEntry._id}`;
		return this.http.delete(url);
	}
}
