import React from "react";
import s from "./Profile.module.css";
import ImgPopup from "../DemosNews/CreateNewsPopup/PopupImg";

export const NewPopup = (props) => {
    return<>
        <div className={s.Event}>
            <div className={s.Username}>
                {props.username}
                <span className={s.time}>
                    {props.date}
                </span>
            </div>
            <div className={s.Title}>
                {props.title}
            </div>
            <div className={s.tags}>
                {props.tags[0] && props.tags[0].name}{props.tags[1] && (", " + props.tags[1].name)}
                {props.tags[2] && ", " + props.tags[2].name}{props.tags[3] && ", " + props.tags[3].name}
            </div>
            <p className={s.text}>
                {props.text}
            </p>
            <div className={s.mainPic}>
                <img src={props.picture} onClick={() => props.setModalImgActive(true)}/>
            </div>
        </div>
        <span className={s.ImgWindow}>

            </span>
    </>
}