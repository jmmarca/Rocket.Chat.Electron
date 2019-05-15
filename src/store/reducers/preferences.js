import { app as mainApp, remote } from 'electron';
import {
	LOAD_PREFERENCES,
	SET_PREFERENCES,
	TOGGLE_SPELLCHECKING_DICTIONARY,
} from '../actions';
const app = remote ? remote.app : mainApp;


const filterState = ({
	hasTray = process.platform !== 'linux',
	hasMenus = true,
	hasSidebar = true,
	showWindowOnUnreadChanged = false,
	enabledDictionaries = [app.getLocale()],
}) => ({
	hasTray,
	hasMenus,
	hasSidebar,
	showWindowOnUnreadChanged,
	enabledDictionaries,
});

export const reducer = (state = filterState({}), { type, payload }) => {
	switch (type) {
		case LOAD_PREFERENCES:
			return filterState({ ...payload });

		case SET_PREFERENCES:
			return filterState({ ...state, ...payload });

		case TOGGLE_SPELLCHECKING_DICTIONARY: {
			const { enabledDictionaries } = state;
			const { dictionary, enabled } = payload;
			return filterState({
				...state,
				enabledDictionaries: (
					enabled ?
						[dictionary, ...enabledDictionaries] :
						enabledDictionaries.filter((_dictionary) => _dictionary !== dictionary)
				),
			});
		}
	}

	return state;
};