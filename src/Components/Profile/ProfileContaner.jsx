import React, {useEffect} from "react";
import {connect} from "react-redux";
import Profile from "./Profile";
import {compose} from "redux";
import {withRouter} from "react-router-dom";
import {changePassword, changeUsername, getProfileData} from "../../Redux/Profile_reducer";
import {StopSubmit} from "../../Redux/registr_reducer";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";

const ProfileContainer = (props) => {
    useEffect(() => {
        props.getProfileData(props.match.params.user)
    }, [props.match.params.user])
    return<div>
        <Profile user={props.user} email={props.email} isAuth={props.isAuth}
        mainUser={props.mainUser} posts={props.posts} changeUsername={props.changeUsername}
                 changePassword={props.changePassword} StopSubmit={props.StopSubmit}/>
    </div>
}

const MapStateToProps = (state) => {
    return{
        email: state.profile.email,
        mainUser: state.auth.username,
        user: state.profile.username,
        posts: state.profile.posts,
        isAuth: state.auth.isAuth
    }
}

const ProfileView = compose(
    connect(MapStateToProps,{getProfileData, changeUsername, changePassword, StopSubmit}),
    withRouter,
    withAuthRedirect
)(ProfileContainer)
export default ProfileView