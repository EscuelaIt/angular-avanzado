import { Pipe, PipeTransform } from "@angular/core";
import { expenseCategories } from "@routes/month/state/models/expenseCategories.model";

@Pipe({
	name: "categoryName"
})
export class CategoryNamePipe implements PipeTransform {
	transform(category: string, args?: any): string {
		return expenseCategories[category];
	}
}
