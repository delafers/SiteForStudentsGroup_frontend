import {getUserAuthData} from "./auth_reducer";
import {refreshToken} from "./token_reducer";

const INITIALIZED_SUCCESS = 'INITIALIZED_SUCCESS'

let initialState = {
    initialized: false
};

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case INITIALIZED_SUCCESS:
            console.log("INITIALIZEOnReducer")
            return {
                ...state,
                initialized: true
            }
        default:
            return state;
    }
}

export const initializedSuccess = () => ({type: INITIALIZED_SUCCESS})

export const initializeApp = (token) => (dispatch) => {
    let promise = dispatch(getUserAuthData(token))
    Promise.all([promise]).then(() => {
        dispatch(initializedSuccess())
    })
}
export const initializeAppWithRefresh = () => (dispatch) => {
    let promise = dispatch(refreshToken())
    Promise.all([promise]).then(() => {
        debugger
    dispatch(initializedSuccess())
    })
}

export default appReducer