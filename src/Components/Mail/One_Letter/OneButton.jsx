import React from "react";
import s from './OneButton.module.css'
import Loading from "../../Loading/Loading";
import {NavLink, Redirect} from "react-router-dom";

const Modal = (props) => {
    if(!props.mail) {
        return <Redirect to="/mail"/>
    }
    return(
       <div >
           <div>
               <NavLink to='/mail' className={s.returnBack}>
                   Return to mails list
               </NavLink>
           </div>
           <div className={s.mail}>
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
                      <a href={props.mail.letter[0] === undefined ? "" : props.mail.letter[0].file}>
                          {props.mail.letter[0] === undefined ? "" : props.mail.letter[0].file}
                      </a>
               </div>}
           </div>
       </div>

    )

}
export default Modal