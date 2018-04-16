import { Pipe, PipeTransform } from "@angular/core";
import { expenseCategories } from "@routes/month/models/expenseCategories.model";

@Pipe({
  name: "categoryName"
})
export class CategoryNamePipe implements PipeTransform {
  public expenseCategories = expenseCategories;
  transform(category: string, args?: any): string {
    return expenseCategories[category];
  }
}
