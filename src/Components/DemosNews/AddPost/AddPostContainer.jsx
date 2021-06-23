import React from 'react'
import AddPost from "./AddPost";
import {connect} from "react-redux";
import {addComments, getNewsByTags, onPostChange} from "../../../Redux/demosNews_reducer";

class AddPostContainer extends React.Component{
    componentDidMount() {
        this.props.getNewsByTags()
    }
    render() {
        return<div>
            <AddPost postInfo={this.props.postInfo} textUser={this.props.textUser}/>
        </div>
    }
}
let mapStateToProps = (state) => {
    return{
        postInfo: state.news.postInfo,
        tagsUser: state.news.tagsUser,
        textUser: state.news.textUser,
        username: state.news.username,
    }
}




const PostsView = connect(mapStateToProps,{onPostChange, addComments, getNewsByTags})(AddPostContainer);
export default PostsView