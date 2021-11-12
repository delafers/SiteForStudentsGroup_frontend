import {authAPI, ProfileAPI} from "../api/api";
import {logout} from "./auth_reducer";
import {stopSubmit} from "redux-form";

const SET_PROFILE_DATA = "SET-PROFILE"

let initialState = {
    id: null,
    email: null,
    username: null,
    posts: []
}

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_PROFILE_DATA:
            return {
                ...state,
                ...action.payload,
            }
        default:
            return state;
    }
}

export const setProfileData = (id, email, username, posts) => ({type: SET_PROFILE_DATA, payload:{id, email, username, posts}})

export const getProfileData = (username) => async (dispatch) => {
    await ProfileAPI.getOneUserData(username)
        .then(response => response.text())
        .then(result => {
            let userData = JSON.parse(result)
            let {id, email, username, posts = []} = userData;
            dispatch(setProfileData(id , email, username, posts))
        })
}

export const changeUsername = (username, password) => async (dispatch) =>{
    await ProfileAPI.changeUsername(username, password)
        .then(response => {
        if(response.status === 400){
            debugger
            dispatch(stopSubmit("username", {_error: "Имя уже существует или пароль неверен"}))
        }})
        .then(
        //dispatch(setProfileData(null, null, null,[])),
        //dispatch(logout())
    )
}
export  const changePassword = (newPassword, password) => async (dispatch) => {
    await ProfileAPI.changePassword(newPassword, password)
        .then( response => {
            if(response.status === 400){
                response.text().then(result => {
                    let err = JSON.parse(result)
                dispatch(stopSubmit("passwordChange", {_error: err.current_password || err.new_password}))
            })
        }}
    )
}
export default profileReducer