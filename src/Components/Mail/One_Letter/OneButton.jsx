import React from "react";
import './OneButton.module.css'
import Loading from "../../Loading/Loading";

const Modal = (props) => {
    if(!props.mail) {
        return <Loading/>
    }
    debugger
    return(
        <div className='modal'>
            <div className='modal__content'>
                {props.mail.mailer}
            </div>
        </div>
    )

}
export default Modal