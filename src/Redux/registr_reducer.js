import {authAPI, ProfileAPI} from "../api/api";
import {stopSubmit} from "redux-form";

const SET_USER_DATA = 'SET_USER_DATA'

let initialState = {
    userId: null,
    email: null,
    login: null,
    isAuth: false
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
export const setAuthUserData = (userId, email, login, isAuth) => ({type: SET_USER_DATA, payload:{userId, email, login, isAuth}})

export const getUserAuthData = () => (dispatch) => {
    authAPI.me().then(response => {
        if (response.data.resultCode === 0){
            let {id, email, login} = response.data.data;
            dispatch(setAuthUserData(id , email, login, true ))
        }});
}
export const StopSubmit = (formName) => (dispatch) => {
    dispatch(stopSubmit(formName, {_error: "Пароли не совпадают"}))
}

export const logout = () => (dispatch) => {
    authAPI.logout().
    then(response => {
        if (response.data.resultCode === 0){
            dispatch(setAuthUserData(null , null, null, false ))
        }});
}

export const passwordChangeConfirm = (userId, userdata, newPassword) => async (dispatch) => {
    let response = await ProfileAPI.resetPasswordConfirm(userId, userdata, newPassword)
    response.text().then(
        result => {
            debugger
        }
    )
}

export default authReducer