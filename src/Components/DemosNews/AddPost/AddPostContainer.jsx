import React from 'react'
import AddPost from "./AddPost";
import {connect} from "react-redux";
import {getNewsByTags, onPostChange, SetRefactoringPostData} from "../../../Redux/demosNews_reducer";

class AddPostContainer extends React.Component{
    componentDidMount() {
        this.props.getNewsByTags()
    }
    render() {
        return<div>
            <AddPost postInfo={this.props.postInfo} textUser={this.props.textUser} registerUser={this.props.registerUser}
                     SetRefactoringPostData={this.props.SetRefactoringPostData} />
        </div>
    }
}
let mapStateToProps = (state) => {
    return{
        postInfo: state.news.postInfo,
        tagsUser: state.news.tagsUser,
        textUser: state.news.textUser,
        username: state.news.username,
        registerUser: state.auth.username
    }
}

const PostsView = connect(mapStateToProps,{onPostChange, getNewsByTags, SetRefactoringPostData})(AddPostContainer);
export default PostsView