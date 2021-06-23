import React from 'react'
import s from './Post.module.css'
import {onPostChange} from "../../../Redux/demosNews_reducer";




const Posts = (props) => {
    debugger
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
        </div>
    )
};

export default Posts