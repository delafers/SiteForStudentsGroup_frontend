import {authAPI} from "../api/api";

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
            let {username, password} = response.data.data;
            dispatch(setAuthUserData(username, password ))
        }});
}
export const login = (username, password) => (dispatch) => {
    authAPI.login(username, password).then(response => {
        debugger
        if (response.data.resultCode === 0){
            dispatch(getUserAuthData())
        }});
}
export const logout = () => (dispatch) => {
    authAPI.logout().
    then(response => {
        if (response.data.resultCode === 0){
            dispatch(setAuthUserData(null , null, null, false ))
        }});
}


export default authReducer