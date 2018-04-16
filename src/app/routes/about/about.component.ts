import { Component, OnInit } from "@angular/core";

@Component({
  selector: "ab-about",
  template: `
    <ab-widget-header mode="h1" caption="Kakebo" value="Ledger for household economy."></ab-widget-header>
    <h3>Projected Incomings and Regular Outgoings</h3>
    <h3>Expenses : General, Leisure, Culture, Extras...</h3>
    <h3>Goals, savings, available money...</h3>
    <h4>This is a Sample Application made with Angular</h4>
    <h5>By <a href="https://twitter.com/albertobasalo">Alberto Basalo</a></h5>
  `,
  styles: []
})
export class AboutComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
