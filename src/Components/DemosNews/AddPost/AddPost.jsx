import React from 'react';
import s from './AddPost.module.css';


const OnePost = (props) => {
    return (
        <div className={s.Event}>
            <div >
                Пользователь: {props.username}
                <span>
                    Тэги: {props.tags[0] && props.tags[0].name}, {props.tags[1] && props.tags[1].name} {props.tags[2] && props.tags[2].name}
                </span>
            </div>
            <div>
                <div>
                    заголовок: {props.title}
                </div>
                Текст: {props.text}
                <span>
                    {props.date}
                </span>
            </div>
        </div>

    )
}
const AddPost = (props) => {
    let PostsElements = props.postInfo.map(post => <OnePost tags={post.tags} date={post.date} username={post.author.username}
                                                            title={post.title} text={post.text}/>);
    return(
        <div >
            {PostsElements}
        </div>
    )
}

export default AddPost;