import React from 'react'
import Posts from "./Post";
import {connect} from "react-redux";
import {addComments, onPostChange} from "../../../Redux/demosNews_reducer";


let mapStateToProps = (state) => {
    return{
        postInfo: state.news.postInfo,
        tagsUser: state.news.tagsUser,
        textUser: state.news.textUser,
        username: state.news.username,
    }
}




const PostsContainer = connect(mapStateToProps,{onPostChange, addComments})(Posts);
export default PostsContainer