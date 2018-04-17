import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "@environments/environment";
import { MonthBalance } from "@routes/month/state/models/month_balance.model";

@Component({
	selector: "ab-home",
	template: `
  <main>
    <ab-dashboard [balances]="balances$ | async"></ab-dashboard>
  </main>
  `,
	styles: []
})
export class HomeComponent implements OnInit {
	public balances$;

	constructor(private http: HttpClient) {}

	ngOnInit() {
		const urlMonthBalances =
			environment.apiUrl + "priv/monthbalances/";
		this.balances$ = this.http.get<MonthBalance[]>(
			urlMonthBalances
		);
	}
}
