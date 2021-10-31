import {useState} from "react";
import React from "react";
import s from "./Profile.module.css"
import ImgPopup from "../DemosNews/CreateNewsPopup/PopupImg";
import {createField, Input} from "../common/FormsControls/FormsControls";
import {requiredFindByTag, tagCheckInSearch} from "../../utils/validators/validator";
import {reduxForm} from "redux-form";
const ChangeProfileInfoForms = (props) => {
    return(
        <form onSubmit={props.handleSubmit}>
            <div>
                <p>
                {createField("Имя пользователя", 'mailChange', [], Input )}
                </p>
                {createField("Изменит пароль", 'password', [tagCheckInSearch, requiredFindByTag], Input )}
                {createField("Подтвердите пароль", 'passwordConfirm', [tagCheckInSearch, requiredFindByTag], Input )}
                <button>Сохранить изменения</button>
            </div>
        </form>
    )
}

const ChangeProfileInfoReduxForm = reduxForm({form: 'tags'})(ChangeProfileInfoForms)

const Profile = (props) => {
    const [modalImgActive, setModalImgActive] = useState(false)
    const [redactMode, setRedactMode] = useState(false)
    const onSubmit = (formdatas) => {
        console.log(formdatas)
    }
    return <div>
        <h1>
            Profile {props.user}
        </h1>
        <div>
            {props?.user === props.mainUser && !redactMode ? <button onClick={() => {setRedactMode(true)}}>Редактиовать профиль</button>
                : <button onClick={() => {setRedactMode(false)}}>Закрыть редактирование</button> }
            {props?.email}
        </div>
        { redactMode ? <div>
            <ChangeProfileInfoReduxForm onSubmit={onSubmit}/>
        </div>
            : ""}
        <div>
            {props.posts.map(p => <>
                    <div className={s.Event}>
                        <div className={s.Username}>
                            {p.username}
                            <span className={s.time}>
                    {p.date}
                </span>
                        </div>
                        <div className={s.Title}>
                            {p.title}
                        </div>
                        <div className={s.tags}>
                            {p.tags[0] && p.tags[0].name}{p.tags[1] && (", " + p.tags[1].name)}
                            {p.tags[2] && ", " + p.tags[2].name}{p.tags[3] && ", " + p.tags[3].name}
                        </div>
                        <p className={s.text}>
                            {p.text}
                        </p>
                        <div className={s.mainPic}>
                            <img src={p.picture} onClick={() => setModalImgActive(true)}/>
                        </div>
                    </div>
                    <span className={s.ImgWindow}>
                <ImgPopup active={modalImgActive} setActive={setModalImgActive}>
                    <img src={p.picture}/>
                </ImgPopup>
            </span>
                </>
            )}

        </div>
    </div>

}
export default Profile