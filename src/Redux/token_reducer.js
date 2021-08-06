import {authAPI, tokenAPI} from "../api/api";
import {getUserAuthData} from "./auth_reducer";
import {setCookie, getCookie} from "cookielib"
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
    authAPI.login(requestOptions)
        .then(response =>
        response.text())
        .then(result => {
            debugger
            let accessToken = JSON.parse(result)
            if (accessToken.error === undefined) {
                let parceAccess = accessToken.access.split(/(\.)/);
                let secondPart = atob(parceAccess[2])
                let now = new Date();
                let timeLifeToken = JSON.parse(secondPart).exp;
                if ((timeLifeToken - now.getTime() / 1000 - 1800) < 60) {
                    dispatch(setTokenData(accessToken, timeLifeToken))
                    dispatch(getUserAuthData(accessToken.access))
                    localStorage.setItem("access", accessToken.access)
                } else {
                dispatch(refreshToken(requestOptions))
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
            debugger
            let accessToken = JSON.parse(result)
            let parceAccess = accessToken.access.split(/(\.)/);
            //let secondPart = atob(parceAccess[2])
            //let now = new Date();
            localStorage.setItem("access", accessToken.access)
            dispatch(getUserAuthData(localStorage.getItem("access")))
        }
    ).catch((result)=>{
        console.log("result")})
}

export default tokenReducer