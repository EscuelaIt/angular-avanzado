import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ComponentsModule } from "@tools/components/components.module";
import { HomeRoutingModule } from "./home-routing.module";
import { HomeComponent } from './home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
@NgModule({
  imports: [CommonModule, ComponentsModule, HomeRoutingModule],
  declarations: [HomeComponent, DashboardComponent]
})
export class HomeModule {}
