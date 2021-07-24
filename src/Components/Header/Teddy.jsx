import React from "react";
import Header from "./Header";
import {connect} from "react-redux";
import {getUserAuthData, logout} from "../../Redux/auth_reducer";
import {refreshToken} from "../../Redux/token_reducer";
import CheckAccess from "../common/AccessLifeCheck/LifeAccess";
class TeddyHead extends React.Component {
    componentDidMount() {

    }
    render() {
        return(
            <Header {...this.props}/>
        )
    }
}
const mapStateToProps = (state) => ({
    isAuth:state.auth.isAuth,
    username: state.auth.username,
})

export default connect(mapStateToProps,{getUserAuthData,refreshToken, logout})(TeddyHead)