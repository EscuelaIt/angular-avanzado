export interface Global {
	userToken: string;
	userMessage: string;
}

export const globalInitialState: Global = {
	userToken: "",
	userMessage: ""
};
