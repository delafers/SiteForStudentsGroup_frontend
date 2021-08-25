import React from "react";
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";


export const withAuthRedirect = (Component) => {
    class RedirectComponent extends React.Component {
        render() {
            if(!this.props.auth) return <Redirect to='/login'/>
            return <Component {...this.props}/>
        }
    }
    let mapStateToPropsForRedirect = (state) => ({
        auth: state.auth.isAuth
    });
    let ConnectedWithAuthRedirect = connect(mapStateToPropsForRedirect)(RedirectComponent)
    return ConnectedWithAuthRedirect
}