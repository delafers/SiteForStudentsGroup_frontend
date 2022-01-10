import React from "react"
import "./PopupImg.css"

const ImgPopup = ({active, setActive, children}) => {
    return(
        <span className={active ? "modals active" : "modals"} onClick={() => {
            setActive(false)}}>
            <span className={active ? "modals__content active" : "modals__content"} onClick={e => e.stopPropagation()}>
                {children}
            </span>
        </span>
    )
}

export default ImgPopup