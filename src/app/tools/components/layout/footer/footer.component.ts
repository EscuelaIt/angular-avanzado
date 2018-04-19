import { Component, OnInit, Input } from "@angular/core";

@Component({
	selector: "ab-footer",
	template: `
  <footer>
    <mat-toolbar >
      <span>The japanese art of saving money</span>
      <a color ="accent" mat-button href="https://twitter.com/albertobasalo">Coded by Alberto Basalo</a>
      <i>v.: {{version}}</i>
    </mat-toolbar>
  </footer>
  `,
	styles: []
})
export class FooterComponent implements OnInit {
	@Input() public version: string;
	constructor() {}

	ngOnInit() {}
}
