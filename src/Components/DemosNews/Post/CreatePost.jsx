import React, {useState} from 'react'
import {reduxForm} from "redux-form";
import {connect} from "react-redux";
import {createField, Input, Textarea} from "../../common/FormsControls/FormsControls";
import {addPostToServer, setPhoto} from "../../../Redux/demosNews_reducer";
import {maxNumberOfTags, required} from "../../../utils/validators/validator";
import s from "./Post.module.css"

const NewsForm = (props) => {
    const onMainPhotoSelected = (e) => {
        if(e.target.files.length){
            props.setPhoto(e.target.files[0])
        }
    }
    return(
        <form onSubmit={props.handleSubmit}>
            <div className={s.Post}>
            <div>
                {createField("Тэги(если хотите добавить несколько тегов, напишите их через запятую)",'tags',[required,maxNumberOfTags], Textarea)}
            </div>
            <div>
                {createField("Заголовок",'title',[required], Textarea)}
            </div>
            <div className={s.text}>
                {createField("Текст",'text',[required], Textarea)}
            <div>
                <div>
                    <input type="file" onChange={onMainPhotoSelected}/>
                </div>
                <button>Создать пост</button>
            </div>
            </div>
            </div>
        </form>
    )
}
const CreatePostReduxForm = reduxForm({form: 'createPost'})(NewsForm)

const NewPostCreate = (props) => {
    const onSubmit = (formdatas) => {
        props.addPostToServer(formdatas.title, formdatas.text, formdatas.tags, props.img )
        props.setActive(false)
        props.setPhoto(null)
    }

    return<div >
        <h2>Поделись новостью</h2>
        <CreatePostReduxForm onSubmit={onSubmit} setPhoto={props.setPhoto}/>
    </div>
}
const mapStateToProps = (state) => ({
    isAuth:state.auth.isAuth,
    img: state.news.img
})

export default connect(mapStateToProps, {addPostToServer, setPhoto}) (NewPostCreate)