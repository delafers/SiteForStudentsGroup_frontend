import React from "react";
import s from './DemosNews.module.css'

const OneTag = (props) => {
    return(
        <div className={s.tag}>
            {props.text}
            <div className={s.close}
                 onClick={()=>{props.deleteTextFromTags(props.text)}}>
                x
            </div>
        </div>

    )
}
export default OneTag