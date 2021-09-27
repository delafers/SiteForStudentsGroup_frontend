import React from "react";
import {connect} from "react-redux";
import Profile from "./Profile";

const ProfileContainer = () => {
    return<div>
        <Profile/>
    </div>
}
const MapStateToProps = (state) => {
    return{
    }
}

const ProfileView = connect(MapStateToProps,{})(ProfileContainer)
export default ProfileView