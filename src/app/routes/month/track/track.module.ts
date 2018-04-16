import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { SpendingRoutingModule } from "./track-routing.module";
import { ComponentsModule } from "@tools/components/components.module";
import { TrackComponent } from "./track.component";
import { NewExpenseComponent } from "./new-expense/new-expense.component";
import { ExpensesListComponent } from "./expenses-list/expenses-list.component";
import { CategoryNamePipe } from "@routes/month/track/category-name.pipe";

@NgModule({
  imports: [CommonModule, SpendingRoutingModule, ComponentsModule],
  declarations: [
    TrackComponent,
    NewExpenseComponent,
    ExpensesListComponent,
    CategoryNamePipe
  ]
})
export class TrackModule {}
