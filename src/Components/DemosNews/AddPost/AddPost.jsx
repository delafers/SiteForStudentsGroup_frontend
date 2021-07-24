import React from 'react';
import s from './AddPost.module.css';


const OnePost = (props) => {
    return   (
        <div className={s.Event}>
            <div >
                Пользователь: {props.username}
                <span>
                    теги: {props.tags}
                </span>
            </div>
            <div>
                Текст: {props.text}
                <span>
                    {props.date}
                </span>
            </div>
        </div>

    )
}
const AddPost = (props) => {
    debugger
    let PostsElements = props.postInfo.map(post => <OnePost date={post.date} username={post.author.username}
                                                            tags={post.title} text={post.text}/>);
    return(
        <div >
            {PostsElements}
        </div>
    )
}

export default AddPost;