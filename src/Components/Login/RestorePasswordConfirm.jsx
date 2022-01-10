import React from 'react'
import {reduxForm} from "redux-form";
import {connect} from "react-redux";
import {NavLink, Redirect, withRouter} from "react-router-dom";
import s from "./login.module.css"
import {createField, Input} from "../common/FormsControls/FormsControls";
import {required} from "../../utils/validators/validator";
import {compose} from "redux";
import {passwordChangeConfirm, StopSubmit} from "../../Redux/registr_reducer";


const LoginForm = (props) => {
    return(
        <form onSubmit={props.handleSubmit}>
            <div>
                {createField("Новый пароль", "password", [required], Input, "password")}
                {createField("Подтвердите пароль", "passwordConfirm", [required], Input, "password")}
            </div>
            { props.error && <div className={s.formSummaryError}>
                {props.error}
            </div>}
            <div className={s.authButton}>
                <button>Изменить пароль</button>
            </div>
        </form>
    )
}

const RestoreConfirmReduxForm = reduxForm({form: 'restorePasswordConfirm'})(LoginForm)

const ConfirmPasswordPage = (props) => {
    const onSubmit = (formData) => {
        if(formData.password === formData.passwordConfirm ){
            props.passwordChangeConfirm(props.match.params.userId, props.match.params.userData, formData.password )
        }else{
            props.StopSubmit("restorePasswordConfirm")
        }
    }
    return<div className={s.center}>
        <h2>Введите новый пароль</h2>
        <div>
            <RestoreConfirmReduxForm onSubmit={onSubmit}/>
        </div>
        <p>
            <NavLink to='/login'>Вернуться к авторизации</NavLink>
        </p>
    </div>
}
const mapStateToProps = (state) => ({
    isAuth:state.auth.isAuth
})
export default compose(connect(mapStateToProps, {StopSubmit, passwordChangeConfirm}),
    withRouter) (ConfirmPasswordPage)