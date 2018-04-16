import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { MonthComponent } from "@routes/month/month.component";

const routes: Routes = [
  {
    path: "",
    component: MonthComponent,
    children: [
      {
        path: "plan",
        loadChildren: "@routes/month/plan/plan.module#PlanningModule"
      },
      {
        path: "track",
        loadChildren: "@routes/month/track/track.module#TrackModule"
      },
      {
        path: "review",
        loadChildren: "@routes/month/review/review.module#ReviewModule"
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ControlRoutingModule {}
