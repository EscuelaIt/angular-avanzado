import { Component } from "@angular/core";

@Component({
	selector: "ab-root",
	template: `
  <section class="container">
    <ab-header class="row"></ab-header>
    <hr>
    <main>
      <router-outlet ></router-outlet>
    </main>
    <hr>
    <ab-footer class="row"></ab-footer>
  </section>
  `,
	styles: []
})
export class AppComponent {
	title = "kab";
}
