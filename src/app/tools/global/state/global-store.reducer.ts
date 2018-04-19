import {
	Global,
	globalInitialState
} from "@tools/global/state/models/global.model";
import {
	Action,
	GlobalActions
} from "@tools/global/state/global-store.actions";

export function globalStoreReducer(
	state = globalInitialState,
	action: Action
): Global {
	switch (action.type) {
		case GlobalActions.SetUserToken:
			return { ...state, userToken: action.payload };
		case GlobalActions.ShowUserMessage:
			return { ...state, userMessage: action.payload };
		case GlobalActions.SetAppVersion:
			return { ...state, appVersion: action.payload };
		default:
			return state;
	}
}
