import { Pipe, PipeTransform } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "@environments/environment";

@Pipe({
	name: "monthName"
})
export class MonthNamePipe implements PipeTransform {
	private months = [];
	constructor(private http: HttpClient) {
		const url = environment.apiUrl + "pub/categories/months";
		this.http
			.get<string[]>(url)
			.subscribe(res => (this.months = res));
	}

	transform(monthNumber: number, args?: any): any {
		return this.months[monthNumber - 1];
	}
}
