import { SWITCH_LANGUAGE } from './actions';
const initialState = {
  lang: 'en_us',
};

export default function reducer(state, action) {
  if (typeof state === 'undefined') return initialState;

  switch (action.type) {
    case SWITCH_LANGUAGE:
      return Object.assign({}, state, {
        lang: action.lang,
      });
    default:
      return state;
  }
}
