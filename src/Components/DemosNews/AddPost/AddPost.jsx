import React from 'react';
import s from './AddPost.module.css';


const OnePost = (props) => {
    return (
        <div className={s.Event}>
            <div className={s.Title}>
                <span >Пользователь:</span> {props.username}
                <span >Тэги:</span> {props.tags[0] && props.tags[0].name}{props.tags[1] && (", " + props.tags[1].name)}{props.tags[2] && ", " + props.tags[2].name}
                <span className={s.time}>
                    {props.date}
                </span>
            </div>
            <div className={s.Title}>
                <div>
                    <span className={s.Title}>заголовок:</span> {props.title}
                </div>
                <div className={s.text}>
                <span className={s.Title}>Текст:</span> {props.text}
                </div>

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