import {NewsAPI} from "../api/api";

const REFACTOR_COMMENT = 'ADD-COMMENT'
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
    id: null,
    title: null,
    textUser: null,
    postTag: null,
    tagsCreate: null
};

const DemosNewsReducer = (state = initialState, action) => {
    switch (action.type) {
        case  UPDATE_COMMENT_TEXT: {
            return {
                ...state,
                textUser: action.texariacomment,
            }
        }
        case  UPDATE_TAGS_TEXT: {
            return {
                ...state,
                postTag: action.textareatag,
            }
        }
        case  UPDATE_TITLE_TEXT: {
            return {
                ...state,
                title: action.textareatitle,
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
        case SET_ACTIVE_TAGS: {
            return {
                ...state,
                activeTags: [...state.activeTags, action.tag]
            }
        }
        case REMOVE_TAG: {
            return {
                ...state,
                activeTags: state.activeTags.filter(tag => tag !== action.oneTag)
            }
        }
        case REFACTOR_COMMENT: {
            debugger
            return {
                ...state,
                id: action.id,
                title: action.title,
                textUser: action.text,
                postTag: action.tags,
            }
        }
        default:
            return state;
    }

}
export const onPostChange = (comment) => ({type: UPDATE_COMMENT_TEXT, texariacomment: comment})
export const onTagsChange = (comment) => ({type: UPDATE_TAGS_TEXT, textareatag: comment})
export const onTitleChange = (comment) => ({type: UPDATE_TITLE_TEXT, textareatitle: comment})
const setNewsData = (postInfo) => ({type: SET_NEWS, postInfo})
const setTagsData = (tags) => ({type: SET_TAGS, tags})
export const setDataForChangingTag = (id, tags, title, text) => ({type: REFACTOR_COMMENT, id, tags, title, text})
const removeActiveTag = (oneTag) => ({type: REMOVE_TAG, oneTag})
const setActiveTag = (tag) => ({type: SET_ACTIVE_TAGS, tag})

export const getNewsByTags = (tags) => (dispatch) => {
    NewsAPI.getCurrentNews(tags)
        .then(response => response.text())
        .then(result => {
            let NewsData = JSON.parse(result)
            dispatch(setNewsData(NewsData.results))
            dispatch(pushAllTags())
        })
}
export const addPostToServer = (title, text, tag) => async (dispatch) => {
    await NewsAPI.sendNewPost(title, text, tag)
    dispatch(getNewsByTags())
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
    let arr = getState().news.allTags;
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
export const SetRefactoringPostData = (PostId) => async (dispatch, getState) => {
    await NewsAPI.getOnePost(PostId).then(response => response.text())
        .then(result => {
            let data = JSON.parse(result)
            let tags = ""
            debugger
            if (data.tags[0] !== undefined) {
                tags = data.tags[0].name
                if (data.tags[1] !== undefined) {
                    tags = tags + "," + data.tags[1].name
                }
            }
            dispatch(setDataForChangingTag(data.id, tags, data.title, data.text))
        })
}
export const PutUpdatedPost = () => (dispatch, getState) => {

    NewsAPI.changePost(getState().news.id, getState().news.postTag, getState().news.title, getState().news.textUser)
        .then(() => {
            dispatch(getNewsByTags())
        })
}
export default DemosNewsReducer;