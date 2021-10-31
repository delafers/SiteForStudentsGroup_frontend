import {authAPI, ProfileAPI} from "../api/api";

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
export default profileReducer