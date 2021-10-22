import React, {useEffect} from "react";
import {connect} from "react-redux";
import Profile from "./Profile";
import {ProfileAPI} from "../../api/api";
import {compose} from "redux";
import {withRouter} from "react-router-dom";

const ProfileContainer = (props) => {
    debugger
    useEffect(() => {
        ProfileAPI.getUserPosts()
    }, [])
    return<div>
        <Profile user={props.match.params.user}/>
    </div>
}

const MapStateToProps = (state) => {
    return{
    }
}

const ProfileView = compose(
    connect(MapStateToProps,{}),
    withRouter
)(ProfileContainer)
export default ProfileView