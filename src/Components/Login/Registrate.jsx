import React from 'react'
import {Field , reduxForm} from "redux-form";
import {connect} from "react-redux";
import {login, logout, registr} from "../../Redux/createUser_reducer";
import {NavLink, Redirect} from "react-router-dom";

const LoginForm = (props) => {
    return(
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field placeholder={"Username"} name={'username'} component={'input'}/>
            </div>
            <div>
                <Field placeholder={"Email"} name={'email'} component={'input'}/>
            </div>
            <div>
                <Field placeholder={"Password"} name={'password'} component={'input'} type={"password"}/>
            </div>

            <div>
                <button>Create Account</button>
            </div>
        </form>
    )
}
const CreateAccountReduxForm = reduxForm({form: 'login'})(LoginForm)

const Registration = (props) => {
    const onSubmit = (formdatas) => {
        debugger
        let formdata = new FormData();
        formdata.append("username",formdatas.username);
        formdata.append("email",formdatas.email);
        formdata.append("password",formdatas.password);
        let myHeaders = new Headers();
        myHeaders.append("Cookie", "refresh=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9." +
            "eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTYyNDYwOTY5MywianRpIjoiZGEzOGI2YTAyNzBlNGQ2OGI2MzcwMTY0N2UwMjZiZDIiLCJ1c2VyX2lkIjo3fQ." +
            "pCIe85qGPWDQxsMLZ_2KLmHfvvsN4AdlUJE7Bube4DY");
        let requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect:'follow'
        }
        props.registr(requestOptions)
    }

    return<div>
        <h1>Create account</h1>
        <CreateAccountReduxForm onSubmit={onSubmit}/>
        <p>
            <NavLink to='/login'> already registered? </NavLink>
        </p>
    </div>
}
const mapStateToProps = (state) => ({
    isAuth:state.auth.isAuth
})
export default connect(mapStateToProps, {registr}) (Registration)