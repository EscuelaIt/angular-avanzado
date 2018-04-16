import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { PlanComponent } from "@routes/month/plan/plan.component";

const routes: Routes = [
  {
    path: "",
    component: PlanComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlanRoutingModule {}
