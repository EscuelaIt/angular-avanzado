import {
	ChangeDetectionStrategy,
	Component,
	Input,
	OnInit
} from "@angular/core";

@Component({
	selector: "ab-widget-header",
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
  <header >
    <mat-card>
      <ng-container [ngSwitch]="mode">
        <ng-container *ngSwitchCase="'h1'">
          <mat-card-title fxLayout="row" fxLayoutAlign="space-between center" >{{ caption }} <span >{{value}}</span></mat-card-title>
        </ng-container>
        <ng-container *ngSwitchCase="'h2'">
          <mat-card-title fxLayoutAlign="space-between center">{{ caption }} <span >{{value}}</span></mat-card-title>
        </ng-container>
        <ng-container *ngSwitchCase="'h3'">
          <mat-card-subtitle fxLayoutAlign="space-between center" class="mat-display-1">{{ caption }} <span >{{value}}</span></mat-card-subtitle>
        </ng-container>
      </ng-container>
    </mat-card>
  </header>
  `,
	styles: ["header { padding: 0px !important;}"]
})
export class WidgetHeaderComponent implements OnInit {
	@Input() public mode: "h1" | "h2" | "h3";
	@Input() public caption: string;
	@Input() public value: string;
	constructor() {}

	ngOnInit() {}
}
