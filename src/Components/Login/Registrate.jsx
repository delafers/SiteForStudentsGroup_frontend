import React, {useState} from 'react'
import {Field , reduxForm} from "redux-form";
import {connect} from "react-redux";
import {login, logout, registr} from "../../Redux/createUser_reducer";
import {NavLink, Redirect} from "react-router-dom";
import s from "./login.module.css";
import {createField, Input} from "../common/FormsControls/FormsControls";
import {required} from "../../utils/validators/validator";

const LoginForm = (props) => {
    return(
        <form onSubmit={props.handleSubmit}>
            <div>
                {createField("Username",'username',[required], Input)}
            </div>
            <div>
                {createField("Email",'email',[required], Input)}
            </div>
            <div>
                {createField("Password",'password',[required], Input,"password")}
            </div>
            { props.error != "Created" && <div className={s.formSummaryError}>
                {props.error}
            </div>}
            <div>
                <button className={s.authButton}>Создать пользователя</button>
            </div>
            <div className={s.text}>
                {props.error === "Created" && "greetings traveler"}
            </div>
        </form>
    )
}
const CreateAccountReduxForm = reduxForm({form: 'auth'})(LoginForm)

const Registration = (props) => {
    const onSubmit = (formdatas) => {
        debugger
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

export default connect(mapStateToProps, {registr}) (Registration)