import React from 'react'
import Posts from "./PostChange";
import {connect} from "react-redux";
import {
    addPostToServer, DeletePost,
    getNewsByTags,
    onPostChange,
    onTagsChange, onTitleChange, pushAllTags, PutUpdatedPost, setDataForChangingTag
} from "../../../Redux/demosNews_reducer";

class PostChangeContainer extends React.Component{

    render() {
        return<div>
            <Posts postTag={this.props.postTag} title={this.props.title} textUser={this.props.text}
                   id={this.props.id} onPostChangeR={this.props.onPostChange} onTagsChangeR={this.props.onTagsChange}
                   onTitleChangeR={this.props.onTitleChange} PutUpdatedPost={this.props.PutUpdatedPost}
                   setActive={this.props.setActive} DeletePost={this.props.DeletePost}/>
        </div>
    }
}
let mapStateToProps = (state) => {
    return{
        id: state.news.id,
        title: state.news.title,
        text: state.news.textUser,
        postTag: state.news.postTag,
    }
}


const PostsContainer = connect(mapStateToProps,{onPostChange, onTagsChange, onTitleChange,
    getNewsByTags,addPostToServer, pushAllTags, setDataForChangingTag,PutUpdatedPost, DeletePost})(PostChangeContainer);
export default PostsContainer