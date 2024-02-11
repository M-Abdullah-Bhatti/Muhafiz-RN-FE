import {
    legacy_createStore as createStore,
    combineReducers,
    applyMiddleware
} from "redux";
import thunk from "redux-thunk";
import AuthReducer from "./reducers";


const RootReducer = combineReducers({
    AuthReducer
});
export const store = createStore(RootReducer, applyMiddleware(thunk));