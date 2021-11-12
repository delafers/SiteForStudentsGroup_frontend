import {useState} from "react";
import React from "react";
import s from "./Profile.module.css"
import {createField, Input} from "../common/FormsControls/FormsControls";
import {reduxForm} from "redux-form";
import {NewPopup} from "./tetsPopup";
const ChangeProfileInfoForms = (props) => {

    return(
        <form onSubmit={props.handleSubmit}>
            <div>
                {createField("Имя пользователя", 'username', [], Input )}
                {createField("Подтверждение пароля", 'password', [], Input )}
                <button>Сохранить изменения</button>
            </div>
            { props.error && <div className={s.formSummaryError}>
                {props.error}
            </div>}
        </form>
    )
}
const ChangeProfilePasswordForm = (props) => {
    return(
        <form onSubmit={props.handleSubmit}>
            <div>
                {createField("Новый пароль", 'newPassword', [], Input )}
                {createField("Подтвердить новый пароль", 'passwordConfirm', [], Input )}
                {createField("Нынешний пароль", 'password', [], Input )}
                { props.error && <div className={s.formSummaryError}>
                    {props.error}
                </div>}
                <button>Измененить пароль</button>
            </div>
        </form>
    )
}

const ChangeProfileInfoReduxForm = reduxForm({form: 'username'})(ChangeProfileInfoForms)

const ChangeProfilePasswordReduxForm = reduxForm({form: 'passwordChange'})(ChangeProfilePasswordForm)

const Profile = (props) => {
    const [modalImgActive, setModalImgActive] = useState(false)
    const [redactMode, setRedactMode] = useState(false)
    const [redactPassword, setRedactPassword] = useState(false)

    const onSubmit = (formdatas) => {
        props.changeUsername(formdatas.username, formdatas.password)
    }
    const onConfirm = (formdata) => {
        props.changePassword(formdata.newPassword, formdata.password)
    }

    return <div className={s.profilePage}>
        <h2>
            Вы на странице {props.user}
        </h2>
        <div>
            {props?.user === props.mainUser && !redactMode ? <button onClick={() => {setRedactMode(true)}}>Редактиовать профиль</button>
                : <button onClick={() => {setRedactMode(false)}}>Закрыть редактирование</button> }
        </div>

        { redactMode ? <div>
            <ChangeProfileInfoReduxForm onSubmit={onSubmit}/>
        </div>
            : ""}
        { redactPassword ? <div>
            <ChangeProfilePasswordReduxForm onSubmit={onConfirm}/>
            <button onClick={() => setRedactPassword(false) }>Закрыть редактирование</button>
        </div> : <button onClick={() => setRedactPassword(true) }>Изменить пароль</button>}

        <div>
            {props.posts.map(p => <NewPopup username={p.username} date={p.date} tags={p.tags}
                                            title={p.title} text={p.text} setModalImgActive={setModalImgActive}
                                            picture={p.picture} modalImgActive={modalImgActive}/>
            )}

        </div>
    </div>

}
export default Profile