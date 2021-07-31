import React from 'react'
import s from './Post.module.css'



const Posts = (props) => {
    let NewComment = React.createRef();
    let NewTag = React.createRef()
    const Title = React.createRef()

    let onPostChange = () => {
        let comment = NewComment.current.value;
        props.onPostChange(comment);
    }
    let onTagsChange = () => {
        let comment = NewTag.current.value;
        props.onTagsChange(comment)
    }
    let onTitleChange = () => {
        let comment = Title.current.value;
        props.onTitleChange(comment)
    }

    let onAddComments = () => {
        props.addPostToServer(props.title, props.textUser, props.postTag)
        props.setActive(false)
    }

    return (
        <div>
            <div>
                <textarea ref={NewTag} onChange={onTagsChange} value={props.postTag} className={s.title}>Your tags</textarea>
            </div>
            <div>
                <textarea ref={Title} onChange={onTitleChange} value={props.title} className={s.title}>Your title</textarea>
            </div>
            <div>
                <textarea ref={NewComment} onChange={onPostChange} value={props.textUser} className={s.text}>Your text</textarea>
            </div>
            <div>
                <button onClick={onAddComments}>send comment</button>
            </div>
        </div>
    )
};

export default Posts