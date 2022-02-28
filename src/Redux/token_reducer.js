import {authAPI, tokenAPI} from "../api/api";
import {getUserAuthData} from "./auth_reducer";
import {stopSubmit} from "redux-form";
const SET_USER_DATA = 'SET_USER_DATA'

let initialState = {
    accessToken: null,
    timeLifeToken: null
};

const tokenReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.payload,
            }
        default:
            return state;
    }
}

export const setTokenData = (accessToken, timeLifeToken) => ({type: SET_USER_DATA, payload:{accessToken, timeLifeToken}})

export const login = (requestOptions) => (dispatch) => {
    debugger
    authAPI.login(requestOptions)
        .then(response =>
        response.text())
        .then(result => {
            let accessToken = JSON.parse(result)
            if (accessToken.error === undefined) {
                let parceAccess = accessToken.access.split(/(\.)/);
                let secondPart = atob(parceAccess[2])
                let now = new Date();
                let timeLifeToken = JSON.parse(secondPart).exp;
                if (((timeLifeToken - now.getTime() / 1000 )- 10) > 0) {
                    debugger
                    dispatch(setTokenData(accessToken, timeLifeToken))
                    dispatch(getUserAuthData(accessToken.access))
                    localStorage.setItem("access", accessToken.access)
                } else {
                    debugger
                //dispatch(refreshToken(requestOptions))
            }
            }else {
                dispatch(stopSubmit("login", {_error: accessToken.error}))
            }
        }
        )
}
export const refreshToken = () => (dispatch) => {
    tokenAPI.refreshAccess().
        then(response => response.text()).
        then(result => {
            let accessToken = JSON.parse(result)
            localStorage.setItem("access", accessToken.access)
        if(accessToken.access === undefined){
            localStorage.removeItem("access")
        }else{
            dispatch(getUserAuthData(localStorage.getItem("access")))
        }
        }
    )
}

export default tokenReducer