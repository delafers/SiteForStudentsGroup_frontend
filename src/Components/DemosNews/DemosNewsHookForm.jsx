import React, {useEffect, useState} from 'react'
import {Field , reduxForm} from "redux-form";
import {connect} from "react-redux";
import s from './DemosNews.module.css'
import OneTag from "./OneTag";
import PostsContainer from "./Post/PostContainer";
import ModalCreate from "./CreateNewsPopup/CreateNews";
import PostsView from "./AddPost/AddPostContainer";
import {getNewsByTags, removeTag, SetActiveTags} from "../../Redux/demosNews_reducer";
import {createField, Input} from "../common/FormsControls/FormsControls";
import NewPostCreate from "./Post/CreatePost";
import {compose} from "redux";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {NavLink, withRouter} from "react-router-dom";
import {tagCheck} from "../../utils/validators/validator";

const TagsForm = (props) => {
    return(
        <form onSubmit={props.handleSubmit}>
            <div className={s.tagBar}>
                {createField("Найти по тегу", 'tagName', [tagCheck], Input )}
                <button>Поиск</button>
            </div>
        </form>
    )
}
const TagsReduxForm = reduxForm({form: 'tags'})(TagsForm)

const Tags = (props) => {

    const [tags, setTags] = useState([]);
    const [modalActive, setModalActive] = useState(false)

    const onSubmit = (formdatas) => {
        setTags([...tags, formdatas.tagName])
        props.SetActiveTags(formdatas.tagName)
    }
    const deleteTextFromTags = (textToRemove) => {
        setTags(tags.filter(tag => tag != textToRemove))
        props.removeTag(textToRemove)
    }


    return<div className={s.main}>
        <h1>СТАТЬИ И НОВОСТИ</h1>
        <div className={s.tagBar}>
            {
                tags.map(tag => (
                    <div>
                        <OneTag text={tag} deleteTextFromTags={deleteTextFromTags}/>
                    </div>))
            }
        <TagsReduxForm onSubmit={onSubmit}/>
        </div>
        <div className={s.modalButton}>
            <button onClick={() => setModalActive(true)}>Добавить новость</button>
        </div>
        <div>
            <ModalCreate active={modalActive} setActive={setModalActive} >
                <NewPostCreate setActive={setModalActive}/>
            </ModalCreate>
        </div>
        <div>
            <PostsView/>
        </div>
    </div>
}

const mapStateToProps = (state) => ({
    postData :state.news.postInfo,
    username: state.auth.username,
    isAuth: state.auth.isAuth
})

export default compose(
    connect(mapStateToProps, {getNewsByTags, SetActiveTags, removeTag}),
    withRouter,
    withAuthRedirect
    ) (Tags)