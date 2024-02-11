import { SET_CURRENT_USER } from "./types";

const initialState = {
    isAuthenticated: false,
    userData: {},
}

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_CURRENT_USER:
            return {
                ...state, //copy all previous data
                isAuthenticated: true,
                userData: action.payload
            }
        case 'LOGOUT':
            return {
                isAuthenticated: false,
                userData: action.payload
            }
        default:
            return state;
    }
}