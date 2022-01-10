import {authAPI} from "../api/api";
import {stopSubmit} from "redux-form";

const SET_USER_DATA = 'SET_USER_DATA'

let initialState = {
    userId: null,
    email: null,
    username: null,
    isAuth: false,
    password: null
};

const authReducer = (state = initialState, action) => {
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

export const setAuthUserData = (username, password) => ({type: SET_USER_DATA, payload:{username, password}})

export const getUserAuthData = () => (dispatch) => {
    authAPI.me().then(response => {
        if (response.data.resultCode === 0){
            let {username, email, id} = response.data.data;
            dispatch(setAuthUserData(username, email, id))
        }});
}

export const registr = (requestOptions) => (dispatch) => {
    authAPI.auth(requestOptions).
        then(response => {
        if(response.status !== 200 && response.status !== 201){
        response.text().then(
            result => {
                let err = JSON.parse(result)
                console.log(err)
                dispatch(stopSubmit("auth", {_error: err?.username || err?.email || err?.password}))
            }
        )
    }else{
            dispatch(stopSubmit("auth", {_error:"Created"}))
        }
        })
}

export default authReducer