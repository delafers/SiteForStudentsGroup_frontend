import React, {useState} from 'react';
import s from './AddPost.module.css';
import ModalCreate from "../CreateNewsPopup/CreateNews";
import NewPostCreate from "../Post/CreatePost";
import PostsContainer from "../Post/PostChangeContainer";


const OnePost = (props) => {
    const [modalActive, setModalActive] = useState(false)
    return (
        <>
        <div className={s.Event}>
            <div className={s.Username}>
                {props.username}
                <span className={s.time}>
                    {props.date}
                </span>
                    {props.username === props.registerUser ?
                        <img src="https://image.flaticon.com/icons/png/512/124/124068.png" onClick={() => {
                            props.SetRefactoringPostData(props.id)
                            setModalActive(true)}} />:""}
            </div>
            <div className={s.Title}>
                {props.title}
            </div>
                <div className={s.tags}>
                {props.tags[0] && props.tags[0].name}{props.tags[1] && (", " + props.tags[1].name)}{props.tags[2] && ", " + props.tags[2].name}
                </div>
                <div className={s.text}>
                {props.text}
                </div>
        </div>
            <div>
                <ModalCreate active={modalActive} setActive={setModalActive} >
                    <PostsContainer setActive={setModalActive}/>
                </ModalCreate>
            </div>
        </>

    )
}
const AddPost = (props) => {
    let PostsElements = props.postInfo.map(post => <OnePost id={post.id}tags={post.tags} date={post.date} username={post.author.username}
                                                            title={post.title} text={post.text} registerUser={props.registerUser}
                                                            SetRefactoringPostData={props.SetRefactoringPostData}/>);
    return(
        <div >
            {PostsElements}
        </div>
    )
}

export default AddPost;