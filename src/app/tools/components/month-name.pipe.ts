import { Pipe, PipeTransform } from "@angular/core";
import { months } from "@tools/models/months.model";

@Pipe({
	name: "monthName"
})
export class MonthNamePipe implements PipeTransform {
	transform(monthNumber: number, args?: any): any {
		return months[monthNumber - 1];
	}
}
