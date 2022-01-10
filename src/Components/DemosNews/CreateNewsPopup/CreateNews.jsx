import React from "react"
import "./CreateNews.css"

const ModalCreate = ({active, setActive, children},props) => {
    return(
        <div className={active ? "modal active" : "modal"} >
            <div className={active ? "modal__content active" : "modal__content"} onClick={e => e.stopPropagation()}>
                {props.username}
                <span onClick={() => {setActive(false)}} className="close">X</span>
                {children}
            </div>
        </div>
    )
}

export default ModalCreate