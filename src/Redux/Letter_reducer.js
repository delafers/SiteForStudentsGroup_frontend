import {mailAPI} from "../api/api";

const  SET_MAIL_INFO = 'SET_USER_PROFILE'

let initialState =  {
    mail: null
}

const MailReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_MAIL_INFO:
            return {...state, mail: action.mail}
        default:
            return state
    }
}

export const setMailContent = (mail) => ({type:SET_MAIL_INFO, mail})
export const getMailData = (mailId) => async (dispatch) => {
    await mailAPI.OneMail(mailId)
        .then(response => response.text())
        .then(result => {
            dispatch(setMailContent(JSON.parse(result)))
    })
}
export default MailReducer