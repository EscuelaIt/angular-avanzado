import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { NavLink } from "@tools/models/nav-link.model";
import { map } from "rxjs/operators";
import {
	MonthBalance,
	monthBalanceInitialState
} from "@routes/month/state/models/month_balance.model";
import { Observable } from "rxjs";
import { MonthStore } from "@routes/month/state/month.state";
import { MonthApi } from "@routes/month/state/month-store/month-api.service";
import { JournalApi } from "@routes/month/state/journal-store/journal-api.service";
import {
	GetMonthBalance,
	PostMonthBalance
} from "@routes/month/state/month-store/month-store.actions";
import { GetJournalEntries } from "@routes/month/state/journal-store/journal-store.actions";

@Component({
	selector: "ab-month",
	template: `
  <section *ngIf="monthBalance$ | async ">
    <ab-widget-header mode="h1" caption="Balance on {{month | monthName }} of {{ year }}" value="{{savings$ | async}} €"></ab-widget-header>
    <section class="row">
      <aside class="column column-20">
        <ab-nav [navLinks]="navLinks"></ab-nav>
      </aside>
      <main class="column float-left">
        <router-outlet></router-outlet>
      </main>
    </section>
  </section>
  <ng-template #noMonthBalance>
    <ab-widget-header mode="h3" caption="No Balance for {{month | monthName }} of {{ year }}" value="Creating a new one..."></ab-widget-header>
  </ng-template>
  `,
	styles: []
})
export class MonthComponent implements OnInit {
	public monthBalance$: Observable<MonthBalance>;
	public savings$: Observable<number>;
	public year: number;
	public month: number;
	public navLinks: NavLink[] = [
		{
			caption: "Plan",
			routerLink: "plan"
		},
		{
			caption: "Track",
			routerLink: "track"
		},
		{
			caption: "Review",
			routerLink: "review"
		}
	];
	constructor(
		private activatedRoute: ActivatedRoute,
		private monthStore: MonthStore,
		private monthApi: MonthApi,
		private journalApi: JournalApi
	) {}

	ngOnInit() {
		const params = this.activatedRoute.snapshot.params;
		this.year = +params["y"];
		this.month = +params["m"];
		const yearMonth = { year: this.year, month: this.month };
		this.monthBalance$ = this.monthStore.selectMonthBalance$;
		this.savings$ = this.monthBalance$.pipe(
			map(m => m.savings)
		);
		this.monthApi
			.getMonthBalancesByYearMonth$(yearMonth)
			.subscribe(
				res =>
					this.monthStore.dispatchMonth(
						new GetMonthBalance(res[0])
					),
				err =>
					this.monthApi
						.postMonthBalance$({
							...monthBalanceInitialState,
							year: this.year,
							month: this.month
						})
						.subscribe(res =>
							this.monthStore.dispatchMonth(
								new PostMonthBalance(res)
							)
						)
			);
		this.journalApi
			.getJournalEntriesByYearMonth$(yearMonth)
			.subscribe(res =>
				this.monthStore.dispatchJournal(
					new GetJournalEntries(res)
				)
			);
	}
}
