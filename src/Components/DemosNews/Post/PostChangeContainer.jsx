import React from 'react'
import Posts from "./PostChange";
import {connect} from "react-redux";
import {
    addPostToServer, DeletePost,
    getNewsByTags,
    onPostChange,
    onTagsChange, onTitleChange, pushAllTags, PutUpdatedPost, setDataForChangingTag, setPhoto
} from "../../../Redux/demosNews_reducer";

class PostChangeContainer extends React.Component{
    render() {
        return<div>
            <Posts postTag={this.props.postTag} title={this.props.title} textUser={this.props.text}
                   id={this.props.id} onPostChangeR={this.props.onPostChange} onTagsChangeR={this.props.onTagsChange}
                   onTitleChangeR={this.props.onTitleChange} PutUpdatedPost={this.props.PutUpdatedPost}
                   setActive={this.props.setActive} DeletePost={this.props.DeletePost} img={this.props.img}
                   setPhoto={this.props.setPhoto}/>
        </div>
    }
}
let mapStateToProps = (state) => {
    return{
        id: state.news.id,
        title: state.news.title,
        text: state.news.textUser,
        postTag: state.news.postTag,
        img: state.news.img
    }
}


const PostsContainer = connect(mapStateToProps,{onPostChange, onTagsChange, onTitleChange,
    getNewsByTags,addPostToServer, pushAllTags, setDataForChangingTag,PutUpdatedPost, DeletePost, setPhoto})(PostChangeContainer);
export default PostsContainer