import React from 'react'
import Posts from "./Post";
import {connect} from "react-redux";
import {
    addPostToServer,
    getNewsByTags,
    onPostChange,
    onTagsChange, onTitleChange, pushAllTags
} from "../../../Redux/demosNews_reducer";
import Post from "./Post";

class PostContainer extends React.Component{
    componentDidMount() {
        this.props.getNewsByTags();
        this.props.pushAllTags()
    }
    render() {
        return<div>
            <Post postInfo={this.props.postInfo} textUser={this.props.textUser}
                  title={this.props.title} onTagsChange={this.props.onTagsChange}
                onPostChange={this.props.onPostChange} addPostToServer={this.props.addPostToServer} username={this.props.username}
                  postTag={this.props.postTag} onTitleChange={this.props.onTitleChange} setActive={this.props.setActive}/>
        </div>
    }
}
let mapStateToProps = (state) => {
    return{
        postInfo: state.news.postInfo,
        title: state.news.title,
        textUser: state.news.textUser,
        username: state.news.username,
        postTag: state.news.postTag,
    }
}




const PostsContainer = connect(mapStateToProps,{onPostChange, onTagsChange, onTitleChange,
    getNewsByTags,addPostToServer, pushAllTags})(PostContainer);
export default PostsContainer