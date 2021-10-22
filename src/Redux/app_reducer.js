import {getUserAuthData} from "./auth_reducer";
import {refreshToken} from "./token_reducer";

const INITIALIZED_SUCCESS = 'INITIALIZED_SUCCESS'

let initialState = {
    initialized: false
};

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case INITIALIZED_SUCCESS:
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
    let promise = new Promise((resolve, reject) => {
        dispatch(getUserAuthData(token))
    })
    promise.then(dispatch(initializedSuccess()), null)
}
export const initializeAppWithRefresh = () =>  (dispatch) => {
    let promise = new Promise(dispatch(refreshToken()))
    promise.then(() => {
        dispatch(initializedSuccess())
    }).catch(    err => {
        localStorage.removeItem('access')
    })
}

export default appReducer