import { Component, OnInit } from "@angular/core";

@Component({
	selector: "ab-footer",
	template: `
  <footer>
    <blockquote>
      <div class="clearfix">
        <div class="float-left">
          <em>The japanese art of saving money.</em> 
        </div> 
        <div class="float-right"> - Coded by <a href="https://twitter.com/albertobasalo">Alberto Basalo</a></div>
      </div>
    </blockquote>
  </footer>
  `,
	styles: []
})
export class FooterComponent implements OnInit {
	constructor() {}

	ngOnInit() {}
}
