import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
	name: "objectKeys"
})
export class ObjectKeysPipe implements PipeTransform {
	transform(target: number, args?: any): any {
		return Object.keys(target);
	}
}
