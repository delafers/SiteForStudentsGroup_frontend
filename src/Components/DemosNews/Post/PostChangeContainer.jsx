import React from 'react'
import Posts from "./PostChange";
import {connect} from "react-redux";
import {
    addPostToServer,
    getNewsByTags,
    onPostChange,
    onTagsChange, onTitleChange, pushAllTags, PutUpdatedPost, setDataForChangingTag
} from "../../../Redux/demosNews_reducer";

class PostChangeContainer extends React.Component{

    render() {
        return<div>
            <Posts postTag={this.props.postTag} title={this.props.title} textUser={this.props.text}
                   onPostChangeR={this.props.onPostChange} onTagsChangeR={this.props.onTagsChange}
                   onTitleChangeR={this.props.onTitleChange} PutUpdatedPost={this.props.PutUpdatedPost}
                   setActive={this.props.setActive}/>
        </div>
    }
}
let mapStateToProps = (state) => {
    return{
        title: state.news.title,
        text: state.news.textUser,
        postTag: state.news.postTag,
    }
}


const PostsContainer = connect(mapStateToProps,{onPostChange, onTagsChange, onTitleChange,
    getNewsByTags,addPostToServer, pushAllTags, setDataForChangingTag,PutUpdatedPost})(PostChangeContainer);
export default PostsContainer