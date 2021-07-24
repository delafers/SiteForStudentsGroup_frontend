import {NewsAPI} from "../api/api";

const ADD_COMMENT = 'ADD-COMMENT'
const UPDATE_COMMENT_TEXT = 'UPDATE-COMMENT-TEXT'
const UPDATE_TAGS_TEXT = 'UPDATE-TAGS-TEXT'
const SET_NEWS = 'SET_NEWS'
const SET_TAGS = 'SET_TAGS'
let initialState = {
    postInfo: [],
    allTags: null,
    title: null,
    textUser: null,
    username: null
};

const DemosNewsReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_COMMENT: {
            debugger;
            let newcomment = {
                username: "Vlad",
                title: state.title,
                text: state.textUser
            };
            debugger
            let stateCopy = {
                ...state,
                postInfo: [...state.postInfo, newcomment],
                textUser: "",
                title: ""
            }
            return stateCopy;
        }
        case  UPDATE_COMMENT_TEXT: {
            return {
                ...state,
                textUser: action.texariacomment,
            }
        }
        case  UPDATE_TAGS_TEXT: {
            debugger
            return {
                ...state,
                title: action.textareatag,
            }
        }
        case SET_NEWS: {
            return {
                ...state,
                postInfo: action.postInfo,
            }
        }
        case SET_TAGS: {
            return {
                ...state,
                allTags: action.tags,
            }
        }
        default:
            return state;
    }

}
export const onPostChange = (comment) => ({type: UPDATE_COMMENT_TEXT, texariacomment: comment})
export const onTagsChange = (comment) => ({type: UPDATE_TAGS_TEXT, textareatag: comment})
export const addComments = () => ({type: ADD_COMMENT})
const setNewsData = (postInfo) => ({type: SET_NEWS, postInfo})
const setTagsData = (tags) => ({type: SET_TAGS, tags})

export const getNewsByTags = (tags) => (dispatch) => {
    debugger
    NewsAPI.getCurrentNews(tags)
        .then(response => response.text())
        .then(result => {
            let NewsData = JSON.parse(result)
            dispatch(setNewsData(NewsData.results))
        })
}
export const addPostToServer = (tag, text, date, username) => (dispatch) => {
    NewsAPI.sendNewPost(tag, text, username)
        .then(response => response.text())
        .then(result => console.log(result))
    dispatch(addComments())
}
export const pushAllTags = () => (dispatch) => {
    debugger
    NewsAPI.getAllTags()
        .then(response => response.text())
        .then(result => {
            console.log(result)
            dispatch(setTagsData(result))
        })
}
export const SetActiveTags = (tag) => (dispatch) => {
    debugger
    let i = 0;
    let j = 0;
    let arr = [{id: 2, name: "tyu"}, {id: 1, name: "kek2"}, {id: 3, name: "kek3"}];
    while (i < arr.length) {
        if (arr[i].name === tag) {
            dispatch(getNewsByTags(arr[i].id))
        }
        i++
    }
}

export default DemosNewsReducer;