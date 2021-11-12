import React from 'react'
import {reduxForm} from "redux-form";
import {connect} from "react-redux";
import {NavLink, Redirect} from "react-router-dom";
import s from "./login.module.css"
import {createField, Input} from "../common/FormsControls/FormsControls";
import {required} from "../../utils/validators/validator";
import {resetPassword} from "../../Redux/auth_reducer";

const LoginForm = (props) => {
    return(
        <form onSubmit={props.handleSubmit}>
            <div>
                {createField("Ваша почта", "email", [required], Input)}
            </div>
            { props.error && <div className={s.formSummaryError}>
                {props.error}
            </div>}
            <div className={s.authButton}>
                <button>Получить письмо для восстановления пароля</button>
            </div>
        </form>
    )
}

const RestoreReduxForm = reduxForm({form: 'restorePassword'})(LoginForm)

const Restore = ({resetPassword}) => {
        const onSubmit = (email) => {
            resetPassword(email.email)
    }

    return<div className={s.center}>
        <h2>Восстановить пароль</h2>
        <RestoreReduxForm onSubmit={onSubmit}/>
        <p>
            <NavLink to='/login'>Вернуться к авторизации, если вспомнил пароль</NavLink>
        </p>
    </div>
}
const mapStateToProps = (state) => ({
    isAuth:state.auth.isAuth
})
export default connect(mapStateToProps, {resetPassword}) (Restore)