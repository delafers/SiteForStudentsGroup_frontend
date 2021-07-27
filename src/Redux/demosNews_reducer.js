import {NewsAPI} from "../api/api";

const ADD_COMMENT = 'ADD-COMMENT'
const UPDATE_COMMENT_TEXT = 'UPDATE-COMMENT-TEXT'
const UPDATE_TAGS_TEXT = 'UPDATE-TAGS-TEXT'
const UPDATE_TITLE_TEXT = 'UPDATE_TITLE_TEXT'
const SET_NEWS = 'SET_NEWS'
const SET_TAGS = 'SET_TAGS'
const SET_ACTIVE_TAGS = 'SET_ACTIVE_TAGS'
const REMOVE_TAG = 'REMOVE_TAG'
let initialState = {
    postInfo: [],
    allTags: [],
    activeTags: [],
    title: null,
    textUser: null,
    username: null,
    tagsCreate: null
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
        case  UPDATE_TITLE_TEXT: {
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
            debugger
            return {
                ...state,
                allTags: action.tags,
            }
        }
        case SET_ACTIVE_TAGS:{
            return {
                ...state,
                activeTags: [...state.activeTags, action.tag]
            }
        }
        case REMOVE_TAG:{
            debugger
            return {
                ...state,
                activeTags: state.activeTags.filter(tag => tag != action.oneTag)
            }
        }
        default:
            return state;
    }

}
export const onPostChange = (comment) => ({type: UPDATE_COMMENT_TEXT, texariacomment: comment})
export const onTagsChange = (comment) => ({type: UPDATE_TAGS_TEXT, textareatag: comment})
export const onTitleChange = (comment) => ({type: UPDATE_TITLE_TEXT, textareatag: comment})
export const addComments = () => ({type: ADD_COMMENT})
const setNewsData = (postInfo) => ({type: SET_NEWS, postInfo})
const setTagsData = (tags) => ({type: SET_TAGS, tags})
const removeActiveTag = (oneTag) => ({type: REMOVE_TAG, oneTag})
const setActiveTag = (tag) => ({type: SET_ACTIVE_TAGS, tag})

export const getNewsByTags = (tags) => (dispatch) => {
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
    NewsAPI.getAllTags()
        .then(response => response.text())
        .then(result => {
            dispatch(setTagsData(JSON.parse(result)))
        })
}
export const SetActiveTags = (tag) => (dispatch, getState) => {
    let i = 0;
    let j = 0;
    let arr = getState().news.allTags;
    debugger
    while (i < arr.length) {
        if (arr[i].name === tag) {
            dispatch(setActiveTag(arr[i].name))
            dispatch(getNewsByTags(getState().news.activeTags))
        }
        i++
    }
}
export const removeTag = (tag) => (dispatch, getState) => {
    dispatch(removeActiveTag(tag))
    dispatch(getNewsByTags(getState().news.activeTags))
}

export default DemosNewsReducer;