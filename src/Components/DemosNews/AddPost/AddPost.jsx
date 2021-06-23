import React from 'react';
import Style from './AddPost.module.css';
import StyleParent from '../DemosNews.module.css';


const OnePost = (props) => {
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
const AddPost = (props) => {
    let PostsElements = props.postInfo.map(post => <OnePost username={post.username} tags={post.title} text={post.text}/>);
    return(
        <div>
            {PostsElements}
        </div>
    )
}

export default AddPost;