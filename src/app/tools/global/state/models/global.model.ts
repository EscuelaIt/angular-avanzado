export interface Global {
	userToken: string;
	userMessage: string;
	appVersion: string;
}

export const globalInitialState: Global = {
	userToken: "",
	userMessage: "",
	appVersion: ""
};
