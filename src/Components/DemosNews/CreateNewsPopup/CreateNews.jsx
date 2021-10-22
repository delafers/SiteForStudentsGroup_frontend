import React from "react"
import "./CreateNews.css"

const ModalCreate = ({active, setActive, children},props) => {
    return(
        <div className={active ? "modal active" : "modal"} onClick={() => {
            setActive(false)}}>
            <div className={active ? "modal__content active" : "modal__content"} onClick={e => e.stopPropagation()}>
                {props.username}
                {children}
            </div>
        </div>
    )
}

export default ModalCreate