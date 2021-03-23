const  SET_USER_PROFILE = 'SET_USER_PROFILE'

let initialState =  {
    mail: null
}

const MailReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_PROFILE:
            debugger
            return {...state, mail: action.mail}
        default:
            return state
    }
}

export const setMailContent = (mail) => ({type:SET_USER_PROFILE, mail})
export default MailReducer