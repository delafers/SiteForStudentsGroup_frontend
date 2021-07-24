import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import lettersReducer from "./LettersService";
import MailReducer from "./Letter_reducer";
import {reducer as formReducer} from 'redux-form'
import authReducer from "./auth_reducer";
import thunkMiddleware from "redux-thunk"
import tokenReducer from "./token_reducer";
import DemosNewsReducer from "./demosNews_reducer";
import appReducer from "./app_reducer";



let reducers = combineReducers({
        MailPage: lettersReducer,
        letterPage: MailReducer,
        auth: authReducer,
        token: tokenReducer,
        news: DemosNewsReducer,
        app: appReducer,
        form: formReducer
    }
);


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunkMiddleware)));
window.__store__ = store;


export default store
