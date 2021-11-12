import React, {useEffect} from "react";
import {connect} from "react-redux";
import Profile from "./Profile";
import {compose} from "redux";
import {withRouter} from "react-router-dom";
import {changePassword, changeUsername, getProfileData} from "../../Redux/Profile_reducer";
import {ProfileAPI} from "../../api/api";

const ProfileContainer = (props) => {
    useEffect(() => {
        props.getProfileData(props.match.params.user)
    }, [])
    return<div>
        <Profile user={props.match.params.user} email={props.email}
        mainUser={props.mainUser} posts={props.posts} changeUsername={props.changeUsername}
                 changePassword={props.changePassword}/>
    </div>
}

const MapStateToProps = (state) => {
    return{
        email: state.profile.email,
        mainUser: state.auth.username,
        posts: state.profile.posts
    }
}

const ProfileView = compose(
    connect(MapStateToProps,{getProfileData, changeUsername, changePassword}),
    withRouter
)(ProfileContainer)
export default ProfileView