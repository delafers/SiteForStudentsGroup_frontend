import React from 'react'
import {reduxForm, stopSubmit} from "redux-form";
import {connect} from "react-redux";
import {registr} from "../../Redux/createUser_reducer";
import {NavLink} from "react-router-dom";
import s from "./login.module.css";
import {createField, Input} from "../common/FormsControls/FormsControls";
import {required} from "../../utils/validators/validator";
import {StopSubmit} from "../../Redux/registr_reducer";

const LoginForm = (props) => {
    return(
        <form onSubmit={props.handleSubmit}>
            <div>
                {createField("Имя пользователя",'username',[required], Input)}
            </div>
            <div>
                {createField("Почта",'email',[required], Input)}
            </div>
            <div>
                {createField("Пароль",'password',[required], Input,"password")}
            </div>
            <div>
                {createField("Подтверждение пароля",'password2',[required], Input,"password")}
            </div>
            { (props.error !== "Created" && props.error !== undefined) && <div className={s.formSummaryError}>
                {props.error}
            </div>}
            <div>
                <button className={s.authButton}>Создать пользователя</button>
            </div>
            <div className={s.text}>
                {props.error === "Created" && <div className={s.after}><div>Аккаунт создан</div>Подтвердите его через почту</div>}
            </div>
        </form>
    )
}
const CreateAccountReduxForm = reduxForm({form: 'auth'})(LoginForm)

const Registration = (props) => {
    const onSubmit = (formdatas) => {
        if(formdatas.password === formdatas.password2){
        let formdata = new FormData();
        formdata.append("username",formdatas.username);
        formdata.append("email",formdatas.email);
        formdata.append("password",formdatas.password);
        let myHeaders = new Headers();
        let requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect:'follow'
        }
        props.registr(requestOptions)
        } else {
            props.StopSubmit("auth")
        }
    }

    return<div className={s.center}>
        <h1>Создать пользователя</h1>
        <CreateAccountReduxForm onSubmit={onSubmit}/>
        <p>
            <NavLink to='/login'> Уже есть аккаунт?
                <div>
                    Перейти к авторизации
                </div>
            </NavLink>
        </p>
    </div>
}
const mapStateToProps = (state) => ({
    isAuth:state.auth.isAuth
})

export default connect(mapStateToProps, {registr, StopSubmit }) (Registration)