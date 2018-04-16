import { AbstractControl } from "@angular/forms";

export function ValidatePassword(control: AbstractControl) {
	if (hasNumber(control.value)) {
		return null;
	}
	return {
		validPassword: {
			valid: false,
			message: "Password without numbers are not allowed"
		}
	};
}
function hasNumber(myString) {
	return /\d/.test(myString);
}
