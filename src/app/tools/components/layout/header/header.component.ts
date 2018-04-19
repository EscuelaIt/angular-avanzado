import {
	Component,
	OnInit,
	Output,
	EventEmitter
} from "@angular/core";
import { GlobalStore } from "@tools/global/state/global-store.state";
import { Observable } from "rxjs";

@Component({
	selector: "ab-header",
	template: `
    <header class="container">
			<mat-toolbar color="primary">
				<button mat-icon-button
								(click)="onToggleSidenav()">
					<mat-icon>menu</mat-icon>
				</button>
				<h1><a mat-button routerLink="">Kakebo</a></h1>
				<span *ngIf="isAnonymous;else welcome"> <a mat-button routerLink="credentials/login">LogIn</a></span>
				<ng-template #welcome>Hello</ng-template>
			</mat-toolbar>
    </header>
  `,
	styles: []
})
export class HeaderComponent implements OnInit {
	public isAnonymous = true;
	@Output() toggleSidenav = new EventEmitter<void>();
	constructor(private store: GlobalStore) {}

	ngOnInit() {
		this.store.selectUserToken$.subscribe(
			(res: string) => (this.isAnonymous = res === "")
		);
	}
	onToggleSidenav() {
		this.toggleSidenav.emit();
	}
}
