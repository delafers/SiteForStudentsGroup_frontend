import {authAPI, tokenAPI} from "../api/api";
const SET_USER_DATA = 'SET_USER_DATA'

let initialState = {
    id: null,
    email: null,
    username: null,
    isAuth: false,
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA:
            debugger
            return {
                ...state,
                ...action.payload,
            }
        default:
            return state;
    }
}

export const setAuthUserData = (id, email, username, isAuth) => ({type: SET_USER_DATA, payload:{id, email, username, isAuth}})

export const getUserAuthData = (resultAccess) => (dispatch) => {
    authAPI.me(resultAccess)
        .then(response => response.text())
        .then(result => {
            let userData = JSON.parse(result)
            let {id, email, username} = userData;
            dispatch(setAuthUserData(id , email, username, true ))
        })
    debugger
    return "result"
}
export const logout = () => (dispatch) => {
    authAPI.logout().
    then(response => {
            dispatch(setAuthUserData(null , null, null, false ))
            localStorage.removeItem('access')
        });
}

export default authReducer