import {applyMiddleware, combineReducers, createStore} from "redux";
import lettersReducer from "./LettersService";
import MailReducer from "./Letter_reducer";
import {reducer as formReducer} from 'redux-form'
import authReducer from "./createUser_reducer";
import thunkMiddleware from "redux-thunk"
import tokenReducer from "./token_reducer";
import DemosNewsReducer from "./demosNews_reducer";



let reducers = combineReducers({
        MailPage: lettersReducer,
        letterPage: MailReducer,
        auth: authReducer,
        token: tokenReducer,
        news: DemosNewsReducer,
        form: formReducer
    }
);


let store = createStore(reducers, applyMiddleware(thunkMiddleware));
window.store = store

export default store
