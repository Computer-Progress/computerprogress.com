
const Types = {
    LOGIN: "LOGIN",
    LOGOUT: "LOGOUT",
};

const initialState = {
    token: '',
};

export default function userReducer(state = initialState, action) {
    switch (action.type) {
    case Types.LOGIN:
        return {...state, ...action.payload.user};
    case Types.LOGIN:
        return initialState;
    default:
        return state;
    }
}

export const Creators = {
    login: (user) => ({
        type: Types.LOGIN,
        payload: {
            user,
    },
    }),
    logout: () => ({
        type: Types.LOGOUT
    })
};