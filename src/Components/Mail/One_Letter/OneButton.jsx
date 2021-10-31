import React from "react";
import s from './OneButton.module.css'
import Loading from "../../Loading/Loading";
import {Link, NavLink, Redirect} from "react-router-dom";
import file from "./../../../assets/file_2.png"

const Modal = (props) => {
    if(!props.mail) {
        return <Loading/>
    } else {
        return (
            <div>
                <div>
                    <NavLink to='/mail' className={s.returnBack}>
                        Вернуться к списку писем
                    </NavLink>
                </div>
                <div className={s.mail}>
                    {props.mail.date_time}
                    <div className={s.sender}>
                   <span className={s.description}>
                       Отправитель:
                   </span>
                        {props.mail.mailer}
                    </div>
                    <div className={s.topic}>
                   <span className={s.description}>
                    Заголовок:
                   </span>
                        {props.mail.topic}
                    </div>
                    <div className={s.text}>
                   <span className={s.description}>
                    Текст:
                   </span>
                        {props.mail.text}
                    </div>
                    {props.mail.letter[0] && <div className={s.file}>
                        <a href={props.mail.letter[0] === undefined ? "" : props.mail.letter[0].file} target="_blank">
                            {props.mail.letter[0] === undefined ? "" : <img src={file}/>}
                        </a>
                        <a href={props.mail.letter[1] === undefined ? "" : props.mail.letter[1].file} target="_blank">
                            {props.mail.letter[1] === undefined ? "" : <img src={file}/> }
                        </a>
                    </div>}
                </div>
            </div>

        )
    }
}

export default Modal