import { Component, OnInit, Input } from "@angular/core";

@Component({
	selector: "ab-footer",
	template: `
  <footer>
    <mat-toolbar color="accent">
      <p>The japanese art of saving money - Coded by
        <a mat-button href="https://twitter.com/albertobasalo">Alberto Basalo</a>
        <i> - v.: {{version}}</i>
      </p>
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
