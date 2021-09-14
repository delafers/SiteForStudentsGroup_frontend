import {NewsAPI} from "../api/api";
import CheckAccess from "../Components/common/AccessLifeCheck/LifeAccess";
import {refreshToken} from "./token_reducer";

const REFACTOR_COMMENT = 'ADD-COMMENT'
const UPDATE_COMMENT_TEXT = 'UPDATE-COMMENT-TEXT'
const UPDATE_TAGS_TEXT = 'UPDATE-TAGS-TEXT'
const UPDATE_TITLE_TEXT = 'UPDATE_TITLE_TEXT'
const SET_NEWS = 'SET_NEWS'
const SET_TAGS = 'SET_TAGS'
const SET_ACTIVE_TAGS = 'SET_ACTIVE_TAGS'
const REMOVE_TAG = 'REMOVE_TAG'
const SAVE_PHOTO = "SAVE_PHOTO"
let initialState = {
    postInfo: [],
    allTags: [],
    activeTags: [],
    id: null,
    title: null,
    textUser: null,
    postTag: null,
    tagsCreate: null,
    img: null
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
            return {
                ...state,
                id: action.id,
                title: action.title,
                textUser: action.text,
                postTag: action.tags,
                img: action.img
            }
        }
        case SAVE_PHOTO: {
           return {
               ...state,
               img: action.photo
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
export const setDataForChangingTag = (id, tags, title, text, img) => ({type: REFACTOR_COMMENT, id, tags, title, text, img})
const removeActiveTag = (oneTag) => ({type: REMOVE_TAG, oneTag})
const setActiveTag = (tag) => ({type: SET_ACTIVE_TAGS, tag})
export const setPhoto = (photo) => ({type: SAVE_PHOTO, photo})

export const getNewsByTags = (tags) => (dispatch) => {
    if(CheckAccess()){
    NewsAPI.getCurrentNews(tags)
        .then(response => response.text())
        .then(result => {
            let NewsData = JSON.parse(result)
            dispatch(setNewsData(NewsData.results))
            dispatch(pushAllTags())
        })}else{
        refreshToken().then(() => {
            NewsAPI.getCurrentNews(tags)
                .then(response => response.text())
                .then(result => {
                    let NewsData = JSON.parse(result)
                    dispatch(setNewsData(NewsData.results))
                    dispatch(pushAllTags())
                })}
        )
    }
}
export const addPostToServer = (title, text, tag, img) => async (dispatch) => {
    await NewsAPI.sendNewPost(title, text, tag, img)
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
                if (data.tags[2] !== undefined) {
                    tags = tags + "," + data.tags[2].name
                }
                if (data.tags[3] !== undefined) {
                    tags = tags + "," + data.tags[3].name
                }
            }
            dispatch(setDataForChangingTag(data.id, tags, data.title, data.text, data.picture))
        })
}
export const PutUpdatedPost = () => (dispatch, getState) => {
    NewsAPI.changePost(getState().news.id, getState().news.postTag, getState().news.title,
        getState().news.textUser, getState().news.img)
        .then(() => {
            dispatch(getNewsByTags())
        })
}
export const DeletePost = (id) => async(dispatch, getState) => {
    await NewsAPI.deleteOnePost(id)
        .then(
            dispatch(getNewsByTags())
        )
}
export default DemosNewsReducer;