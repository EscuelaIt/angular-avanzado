import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ReviewRoutingModule } from "./review-routing.module";
import { ComponentsModule } from "@tools/components/components.module";
import { ReviewComponent } from './review.component';

@NgModule({
  imports: [CommonModule, ReviewRoutingModule, ComponentsModule],
  declarations: [ReviewComponent]
})
export class ReviewModule {}
