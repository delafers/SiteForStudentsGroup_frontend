import {useState} from "react";
import React from "react";
import s from "./Profile.module.css"
import {createField, Input} from "../common/FormsControls/FormsControls";
import {reduxForm} from "redux-form";
import {NewPopup} from "./testPopup";
import {Redirect} from "react-router-dom";

const ChangeProfileInfoForms = (props) => {

    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                {createField("Новое имя пользователя", 'username', [], Input)}
                {createField("Подтверждение пароля", 'password', [], Input, "password")}
                <div>
                    <button>Изменить имя пользователся</button>
                </div>
            </div>
            {props.error && <div className={s.formSummaryError}>
                {props.error}
            </div>}
        </form>
    )
}
const ChangeProfilePasswordForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                {createField("Новый пароль", 'newPassword', [], Input, "password")}
                {createField("Подтвердить новый пароль", 'passwordConfirm', [], Input, "password")}
                {createField("Настоящий пароль", 'password', [], Input, "password")}
                {props.error && <div className={s.formSummaryError}>
                    {props.error}
                </div>}
                <div>
                    <button>Измененить пароль</button>
                </div>
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
        if(formdata.newPassword === formdata.passwordConfirm ){
            props.changePassword(formdata.newPassword, formdata.password)
        }else{
            props.StopSubmit("passwordChange")
        }

    }
    if (!props.isAuth){
        return <Redirect to="/login"/>
    }
    return <div className={s.profilePage}>
        <h2>
            {props.user ? "Вы на странице " + props.user : "Такого пользователя не существует"}
        </h2>
        { props?.user === props.mainUser ? <div className={s.profileChange}>
        <div>
            {!redactMode ?
                <button onClick={() => {
                    setRedactMode(true)
                }}>Редактиовать профиль</button>
                : <div>
                    <ChangeProfileInfoReduxForm onSubmit={onSubmit}/>
                    <button onClick={() => {
                        setRedactMode(false)
                    }}>Закрыть редактирование профиля
                    </button>
                </div>}
        </div>
        <div>
            {props?.user === props.mainUser && !redactPassword
                ? <div>
                    <button onClick={() => setRedactPassword(true)}>Изменить пароль</button>
                </div>
                : <div>
                    <ChangeProfilePasswordReduxForm onSubmit={onConfirm}/>
                    <button onClick={() => setRedactPassword(false)}>Закрыть изменение пароля</button>
                </div>}
        </div>
        </div> : ""}
            <div>
                {props.posts.map(p => <NewPopup username={p.username} date={p.date} tags={p.tags}
                                                title={p.title} text={p.text} setModalImgActive={setModalImgActive}
                                                picture={p.picture} modalImgActive={modalImgActive}/>
                )
                }
            </div>
    </div>
}

export default Profile