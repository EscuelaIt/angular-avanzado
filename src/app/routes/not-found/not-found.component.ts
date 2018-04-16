import { Component, OnInit } from "@angular/core";

@Component({
  selector: "ab-not-found",
  template: `
    <h2>
      Not Found
    </h2>
    <a routerLink=''>Go to Kakebo Home Page</a>
  `,
  styles: []
})
export class NotFoundComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
