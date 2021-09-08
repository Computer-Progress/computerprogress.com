const Types = {
  URL_AFTER_LOGIN: "URL_AFTER_LOGIN",
  CLEAR_URL_AFTER_LOGIN: "CLEAR_URL_AFTER_LOGIN",
};

const initialState = {
  url: "",
};

export default function navigationReducer(state = initialState, action) {
  switch (action.type) {
    case Types.URL_AFTER_LOGIN:
      return { ...state, url: action.payload.url };
    case Types.CLEAR_URL_AFTER_LOGIN:
      return initialState;
    default:
      return state;
  }
}

export const Creators = {
  saveUrl: (url) => ({
    type: Types.URL_AFTER_LOGIN,
    payload: {
      url,
    },
  }),
  clearUrl: () => ({
    type: Types.CLEAR_URL_AFTER_LOGIN,
  }),
};
