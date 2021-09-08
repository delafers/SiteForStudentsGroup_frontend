import React from 'react'
import s from './Post.module.css'
import {DeletePost, PutUpdatedPost} from "../../../Redux/demosNews_reducer";



const Posts = ({postTag="", title="", textUser="", id, onPostChangeR,
                   onTagsChangeR,onTitleChangeR,PutUpdatedPost, setActive, DeletePost}) => {
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
                <button onClick={onAddComments}>Сохранить изменения</button>
                <span><img src="https://cdn-icons-png.flaticon.com/512/216/216658.png"
                           onClick={() => {
                               setActive(false)
                               DeletePost(id)}}/></span>
            </div>
        </div>
    )
};

export default Posts