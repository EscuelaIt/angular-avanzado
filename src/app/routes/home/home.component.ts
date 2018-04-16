import { Component, OnInit } from "@angular/core";

@Component({
  selector: "ab-home",
  template: `
  <main>
    <ab-dashboard></ab-dashboard>
  </main>
  `,
  styles: []
})
export class HomeComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
