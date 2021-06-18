import React from "react";
import s from './OneButton.module.css'
import Loading from "../../Loading/Loading";
import {NavLink, Redirect} from "react-router-dom";

const Modal = (props) => {
    if(!props.mail) {
        return <Redirect to="/mail"/>
    }
    debugger
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
               <div className={s.file}>
                    {props.mail.letter.file}
               </div>
           </div>
       </div>

    )

}
export default Modal