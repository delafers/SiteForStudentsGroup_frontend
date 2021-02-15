import {combineReducers, createStore} from "redux";
import lettersReducer from "./LettersService";

let reducers = combineReducers({
    MailPage: lettersReducer
}
);

let store = createStore(reducers);
window.store = store

export default store
