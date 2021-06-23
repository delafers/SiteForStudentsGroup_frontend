import React, {useEffect, useState} from 'react'
import {Field , reduxForm} from "redux-form";
import {connect} from "react-redux";
import {NavLink, Redirect} from "react-router-dom";
import s from './DemosNews.module.css'
import OneTag from "./OneTag";
import PostsContainer from "./Post/PostContainer";
import ModalCreate from "./CreateNewsPopup/CreateNews";
import {getNewsByTags} from "../../Redux/demosNews_reducer";
import PostsView from "./AddPost/AddPostContainer";

const TagsForm = (props) => {

    return(
        <form onSubmit={props.handleSubmit}>
            <div className={s.tagBar}>
                <Field placeholder={"Add Tag"} name={'tagName'} component={'input'}/>
                <button>Create</button>
                  search by tag
            </div>

        </form>
    )
}
const TagsReduxForm = reduxForm({form: 'login'})(TagsForm)

const Tags = (props) => {

    const [tags, setTags] = useState([]);
    const [modalActive, setModalActive] = useState(false)


    const onSubmit = (formdatas) => {

        setTags([...tags, formdatas.tagName])
    }
    const deleteTextFromTags = textToRemove => {
        setTags(tags.filter(tag => tag != textToRemove))
    }

    if(props.isAuth) {
        return <Redirect to={'/Login'}/>
    }
    return<div className={s.main}>
        <h1>Create news</h1>
        <div className={s.tagBar}>
            {
                tags.map(tag => (
                    <div>
                        <OneTag text={tag} deleteTextFromTags={deleteTextFromTags}/>
                    </div>))
            }
        <TagsReduxForm onSubmit={onSubmit}/>
        </div>
        <div>
            <button onClick={() => setModalActive(true)}>Добавить новость</button>
        </div>
        <div>
            <ModalCreate active={modalActive} setActive={setModalActive} >
                <PostsContainer/>
            </ModalCreate>
        </div>
        <div>
            <PostsView/>
        </div>

    </div>
}
const mapStateToProps = (state) => ({
    postData :state.news.postInfo,
    username: state.auth.username
})
export default connect(mapStateToProps, {}) (Tags)