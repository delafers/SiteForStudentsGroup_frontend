import React from 'react'
import s from './Post.module.css'
import {PutUpdatedPost} from "../../../Redux/demosNews_reducer";



const Posts = ({postTag="", title="", textUser="",onPostChangeR,onTagsChangeR,onTitleChangeR,PutUpdatedPost, setActive}) => {
    let NewComment = React.createRef();
    let NewTag = React.createRef()
    const Title = React.createRef()

    let onPostChange = () => {
        let comment = NewComment.current.value;
        onPostChangeR(comment);
    }
    let onTagsChange = () => {
        let comment = NewTag.current.value;
        onTagsChangeR(comment)
    }
    let onTitleChange = () => {
        let comment = Title.current.value;
        onTitleChangeR(comment)
    }

    let onAddComments = () => {
        setActive(false)
        PutUpdatedPost()
    }

    return (
        <div className={s.base}>
            <div>
                <textarea ref={NewTag} onChange={onTagsChange} value={postTag} className={s.title}/>
            </div>
            <div>
                <textarea ref={Title} onChange={onTitleChange} value={title} className={s.title}/>
            </div>
            <div>
                <textarea ref={NewComment} onChange={onPostChange} value={textUser} className={s.text}/>
            </div>
            <div>
                <button onClick={onAddComments} >send comment</button>
            </div>
        </div>
    )
};

export default Posts