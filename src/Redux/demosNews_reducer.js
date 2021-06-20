const ADD_COMMENT = 'ADD-COMMENT'
const UPDATE_COMMENT_TEXT = 'UPDATE-COMMENT-TEXT'

let initialState = {
    postInfo : [
        {text: "trt", tags:"anime,back-end",username:"Vitalya" },
        {text: "tut", tags:"anime,black-end",username:"Vitya" },
    ],
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
        default:
            return state;
    }

}
export const onPostChange = (comment) => ({type: UPDATE_COMMENT_TEXT, texariacomment: comment})
export const addComments = () => ({type: ADD_COMMENT})


export default DemosNewsReducer;