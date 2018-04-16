import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { AboutRoutingModule } from "./about-routing.module";
import { ComponentsModule } from "@tools/components/components.module";
import { AboutComponent } from './about.component';

@NgModule({
  imports: [CommonModule, AboutRoutingModule, ComponentsModule],
  declarations: [AboutComponent]
})
export class AboutModule {}
