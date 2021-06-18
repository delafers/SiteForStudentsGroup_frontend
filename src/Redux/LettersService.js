const SET_USERS = 'SET-USERS'
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE'
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT'
const TOGGLE_IS_FETING = 'TOGGLE-IS-FETING'

let initialState = {
    users: [],
    //pageSize: 5,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false
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
        case TOGGLE_IS_FETING:
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
export const toggleIsFetching = (isFetching) => ({type: TOGGLE_IS_FETING, isFetching})

export default lettersReducer