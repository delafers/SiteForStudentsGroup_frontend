import React from 'react'
import s from './Post.module.css'
import {onPostChange} from "../../../Redux/demosNews_reducer";


const Post = (props) => {
    return   (
        <div >
            <p>
                tags : {props.tags}
            </p>
            <div >
                {props.username}
            </div>
            <p>
                {props.text}
            </p>

        </div>

    )
}

const Posts = (props) => {
    debugger
    let PostsElements = props.postInfo.map(post => <Post username={post.username} tags={post.tags} text={post.text}/>);
    let NewComment = React.createRef();


    let onPostChange = () => {
        let comment = NewComment.current.value;
        props.onPostChange(comment);
    }

    let onAddComments = () => {
        debugger
        props.addComments();
    }

    return (
        <div>
            <p>
                <textarea ref={NewComment} onChange={onPostChange} value={props.textUser}></textarea>
                <button onClick={onAddComments}>send comment</button>
            </p>
            {PostsElements}
        </div>
    )
};

export default Posts