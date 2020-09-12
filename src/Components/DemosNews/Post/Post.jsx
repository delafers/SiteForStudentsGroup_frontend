import React from 'react';
import Style from './Post.module.css';
import Tags from "../Tags/Tags";


const Post = (props) => {
    return (
        <div className={Style.Post}>
            <div>{props.post.title}</div>
            <div>{props.post.text}</div>
            <div>{props.post.date}</div>
            <div>{props.post.author.username}</div>
            <Tags tags={props.post.tag}
                  url={props.location}
                  style={props.style}
            />


        </div>
    );
};

export default Post;