import {mailAPI} from "../api/api";

const SET_USERS = 'SET-USERS'
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE'
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT'
const TOGGLE_IS_FETCHING = 'TOGGLE-IS-FETING'
const BUTTON_DISABLED = "BUTTON-DISABLED"

let initialState = {
    users: [],
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    isDisabled: false,
};
const lettersReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USERS:
            return{
                ...state,
                users: action.users
            }
        case SET_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.currentPage
            }
        case SET_TOTAL_USERS_COUNT:
            return {
                ...state,
                totalUsersCount: action.count
            }
        case TOGGLE_IS_FETCHING:
            return{
                ...state,
                isFetching: action.isFetching
            }
        default:
            return state;
        }

}

export const setUsers = (users) => ({type: SET_USERS, users})
export const setCurrentPage = (currentPage) => ({type: SET_CURRENT_PAGE, currentPage})
export const setTotalUsersCount = (totalCount) => ({type: SET_TOTAL_USERS_COUNT, count: totalCount})
export const toggleIsFetching = (isFetching) => ({type: TOGGLE_IS_FETCHING, isFetching})
export const disableButton = (isDisabled) => ({type: BUTTON_DISABLED, isDisabled})


export const getMails = () => {
    return async (dispatch) => {
        dispatch(toggleIsFetching(true));
        let response = await mailAPI.getAllMails()
        dispatch(setUsers(response.data.results))
        dispatch(setTotalUsersCount(response.data.count))
        dispatch(toggleIsFetching(false))
    }
}
export const setMailPage= (pageNumber) =>{
    return async (dispatch) =>{
        dispatch(setCurrentPage(pageNumber));
        dispatch(toggleIsFetching(true));
        const response = await mailAPI.getCurrentPageMails(pageNumber)
        dispatch(toggleIsFetching(false))
        dispatch(setUsers(response.data.results));
    }
}
export const updateMails = () => {
    return async (dispatch) =>{
        dispatch(disableButton(true))
        await mailAPI.mailCheck()
        dispatch(getMails())
        dispatch(disableButton(false))
    }
}
export default lettersReducer