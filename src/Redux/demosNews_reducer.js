import {NewsAPI} from "../api/api";

const ADD_COMMENT = 'ADD-COMMENT'
const UPDATE_COMMENT_TEXT = 'UPDATE-COMMENT-TEXT'
const SET_NEWS = 'SET_NEWS'
let initialState = {
    postInfo : [],
    tagsUser: null,
    textUser: null,
    username: null
};

const DemosNewsReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_COMMENT: {
            debugger;
            let newcomment = {
                username: "Vlad",
                tagsUser: "buka",
                text: state.textUser
            };
            debugger
            let stateCopy = {
                ...state,
                postInfo : [...state.postInfo, newcomment],
                textUser: ""
            }
            return stateCopy;
        }
        case  UPDATE_COMMENT_TEXT: {
            return{
                ...state,
                textUser: action.texariacomment,
            }
        }
        case SET_NEWS:{
            return {
                ...state,
                postInfo: action.postInfo,
            }
        }
        default:
            return state;
    }

}
export const onPostChange = (comment) => ({type: UPDATE_COMMENT_TEXT, texariacomment: comment})
export const addComments = () => ({type: ADD_COMMENT})
const setNewsData = (postInfo) => ({type:SET_NEWS, postInfo})

export const getNewsByTags = (tagsId) => (dispatch) => {
    debugger
    NewsAPI.getCurrentNews(tagsId)
        .then(response => response.text())
        .then(result => {
            let NewsData = JSON.parse(result)
            console.log(NewsData.results[0])
            dispatch(setNewsData(NewsData.results))
        })
}

export default DemosNewsReducer;