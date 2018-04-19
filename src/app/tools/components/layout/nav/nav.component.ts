import { Component, OnInit, Input } from "@angular/core";
import { NavLink } from "@tools/models/nav-link.model";

@Component({
	selector: "ab-nav",
	template: `
  <nav mat-tab-nav-bar>
    <a mat-tab-link 
      *ngFor="let link of navLinks" 
      routerLink="{{link.routerLink}}" 
      routerLinkActive
      #rla="routerLinkActive"
      [active]="rla.isActive">
        {{link.caption}}
    </a>
  </nav>
  `,
	styles: []
})
export class NavComponent implements OnInit {
	@Input() navLinks: NavLink[];
	constructor() {}

	ngOnInit() {}
}
