import { Component, OnInit, Input } from "@angular/core";
import { NavLink } from "@tools/models/nav-link.model";

@Component({
  selector: "ab-nav",
  template: `
  <nav>
    <a class="button button-clear" *ngFor="let link of navLinks" routerLink="{{link.routerLink}}">{{link.caption}}</a>
  </nav>
  `,
  styles: []
})
export class NavComponent implements OnInit {
  @Input() navLinks: NavLink[];
  constructor() {}

  ngOnInit() {}
}
