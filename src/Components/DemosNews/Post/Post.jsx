import React from 'react';
import Style from './Post.module.css';
import StyleParent from '../DemosNews.module.css';


const Post = (props) => {
    return (
        <div className={StyleParent.Posts}>
            <div>{props.post.title}</div>
            <div>{props.post.text}</div>
            <div>{props.post.date}</div>
            <div>{props.post.author.username}</div>
        </div>
    );
};

export default Post;