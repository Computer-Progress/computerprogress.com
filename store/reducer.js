const Types = {
  LOGADO: "LOGADO",
};

const initialState = {
  user: null,
};

export default function userLogin(state = initialState, action) {
  switch (action.type) {
    case Types.LOGADO:
      return { ...state, user: action.payload.user };
    default:
      return state;
  }
}

export const Creators = {
  setUser: (user) => ({
    type: Types.LOGADO,
    payload: {
      user,
    },
  }),
};
