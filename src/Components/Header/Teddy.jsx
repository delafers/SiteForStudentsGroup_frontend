import React from "react";
import Header from "./Header";
import {connect} from "react-redux";
import {getUserAuthData, logout} from "../../Redux/auth_reducer";
import {refreshToken} from "../../Redux/token_reducer";
class TeddyHead extends React.Component {
    componentDidMount() {
        console.log(localStorage.getItem("access"))
        debugger
        if(localStorage.getItem("access") !== null){
            let parceAccess = localStorage.getItem("access").split(/(\.)/);
            let secondPart = atob(parceAccess[2]);
            let timeLifeToken = JSON.parse(secondPart).exp;
            let now = new Date();
            if ((timeLifeToken - now.getTime()/1000) < 1800){
                this.props.getUserAuthData(localStorage.getItem("access"))
            }else {
                localStorage.removeItem('access')
                this.props.refreshToken()
            }
        }

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