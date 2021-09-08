const Types = {
  OPEN_ALERT: "OPEN_ALERT",
  CLOSE_ALERT: "CLOSE_ALERT",
};

const initialState = {
  open: false,
  message: "",
  type: "", // error - warning - info - success
};

export default function alertReducer(state = initialState, action) {
  switch (action.type) {
    case Types.OPEN_ALERT:
      return { ...state, ...action.payload.alert };
    case Types.CLOSE_ALERT:
      return initialState;
    default:
      return state;
  }
}

export const Creators = {
  openAlert: (alert) => ({
    type: Types.OPEN_ALERT,
    payload: {
      alert,
    },
  }),
  closeAlert: () => ({
    type: Types.CLOSE_ALERT,
  }),
};
