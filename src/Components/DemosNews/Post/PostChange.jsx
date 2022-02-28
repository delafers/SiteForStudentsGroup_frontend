import React, {useState} from 'react'
import s from './Post.module.css'


const Posts = ({postTag = "", title = "", textUser = "", id, onPostChangeR,
                   onTagsChangeR, onTitleChangeR, PutUpdatedPost, setActive, DeletePost, img, setPhoto}) => {
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
        PutUpdatedPost()
        setActive(false)
        setPhoto(null)
    }
    const onMainPhotoSelected = (e) => {
        if(e.target.files.length){
            setPhoto(e.target.files[0])
            setImgActive(false)
        }
    }
    const [imgActive, setImgActive] = useState(true)
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
            <div className={s.postImg}>
                {imgActive && <img src={img}/>}
            </div>
            <div className={s.changeImg}>
                <span>Изменить фото к посту:</span>
                <input type="file" onChange={onMainPhotoSelected}/>
                {img && <span onClick={() => {
                    setPhoto(null)
                    setImgActive(false)
                }}>Удалить фото</span>}
            </div>
            <div className={s.delete}>
                <button onClick={() => {
                    onAddComments()
                    setImgActive(true)
                }}>Сохранить изменения</button>
                <span><img src="https://cdn-icons-png.flaticon.com/512/216/216658.png"
                           onClick={() => {
                               setActive(false)
                               DeletePost(id)
                           }}/></span>
            </div>
        </div>
    )
};

export default Posts