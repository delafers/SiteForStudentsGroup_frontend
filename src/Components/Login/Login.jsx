import React from 'react'
import {Field , reduxForm} from "redux-form";
import {connect} from "react-redux";
import {NavLink, Redirect} from "react-router-dom";
import {login} from "../../Redux/token_reducer";

const LoginForm = (props) => {
    return(
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field placeholder={"Username"} name={'username'} component={'input'}/>
            </div>
            <div>
                <Field placeholder={"Password"} name={'password'} component={'input'} type={"password"}/>
            </div>
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
        debugger
        login(requestOptions)
    }

    return<div>
        <h1>Login</h1>
        <LoginReduxForm onSubmit={onSubmit}/>
        <p>
            <NavLink to='/registrate'>if you not registr, click here! </NavLink>
        </p>
    </div>
}
const mapStateToProps = (state) => ({
    isAuth:state.auth.isAuth
})
export default connect(mapStateToProps, {login}) (Login)