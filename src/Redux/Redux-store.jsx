import {combineReducers, createStore} from "redux";
import lettersReducer from "./LettersService";
import MailReducer from "./Letter_reducer";
import {reducer as formReducer} from 'redux-form'
import authReducer from "./auth_reducer";


let reducers = combineReducers({
        MailPage: lettersReducer,
        letterPage: MailReducer,
        auth: authReducer,
        form: formReducer
    }
);


let store = createStore(reducers);
window.store = store

export default store
