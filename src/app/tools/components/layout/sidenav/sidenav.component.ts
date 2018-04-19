import { Component, OnInit, Input } from "@angular/core";

@Component({
	selector: "ab-sidenav",
	template: `
	<mat-nav-list>
		<a mat-list-item routerLink="">Kakebo</a>
		<a mat-list-item routerLink="about">About</a>
	</mat-nav-list>
	`,
	styleUrls: []
})
export class SidenavComponent implements OnInit {
	constructor() {}

	ngOnInit() {}
}
