import React from 'react'
import {Field , reduxForm} from "redux-form";
import {connect} from "react-redux";
import {createField, Textarea} from "../../common/FormsControls/FormsControls";
import {addPostToServer} from "../../../Redux/demosNews_reducer";
import {maxNumberOfTags, required, tagCheck} from "../../../utils/validators/validator";
import s from "./Post.module.css"

const NewsForm = (props) => {
    return(
        <form onSubmit={props.handleSubmit}>
            <div className={s.Post}>
            <div>
                {createField("Тэги",'tags',[required, tagCheck,maxNumberOfTags], Textarea)}
            </div>
            <div>
                {createField("Заголовок",'title',[required], Textarea)}
            </div>
            <div className={s.text}>
                {createField("Текст",'text',[required], Textarea)}
            <div>
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
        props.addPostToServer(formdatas.title, formdatas.text, formdatas.tags )
        props.setActive(false)
    }

    return<div >
        <h2>Поделись новостью</h2>
        <CreatePostReduxForm onSubmit={onSubmit}/>
    </div>
}
const mapStateToProps = (state) => ({
    isAuth:state.auth.isAuth
})

export default connect(mapStateToProps, {addPostToServer}) (NewPostCreate)