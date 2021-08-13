import React from 'react'
import {Field , reduxForm} from "redux-form";
import {connect} from "react-redux";
import {NavLink, Redirect} from "react-router-dom";
import {login} from "../../Redux/token_reducer";
import s from "./login.module.css"
import {createField, Input} from "../common/FormsControls/FormsControls";
import {required} from "../../utils/validators/validator";

const LoginForm = (props) => {
    return(
        <form onSubmit={props.handleSubmit}>
            <div>
                {createField("Username", "username", [required], Input)}
            </div>
            <div>
                {createField("Password", "password", [required], Input, "password")}
            </div>
            { props.error && <div className={s.formSummaryError}>
                {props.error}
            </div>}
            <div>
                <button>Login</button>
            </div>
        </form>
    )
}
const LoginReduxForm = reduxForm({form: 'login'})(LoginForm)

const Login = ({login, isAuth}) => {
    const onSubmit = (formdatas) => {
        let formdata = new FormData();
        formdata.append("username",formdatas.username);
        formdata.append("password",formdatas.password);
        let myHeaders = new Headers();
        let requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect:'follow',
            withCredentials: true
        }
        login(requestOptions)
    }

    return<div className={s.center}>
        <h1>Авторизация</h1>
        <LoginReduxForm onSubmit={onSubmit}/>
        <p>
            <NavLink to='/registrate'>Если ты не зарегистрирован, жми сюда</NavLink>
        </p>
    </div>
}
const mapStateToProps = (state) => ({
    isAuth:state.auth.isAuth
})
export default connect(mapStateToProps, {login}) (Login)