import React from "react";
import s from './Mail.module.css'
import {NavLink} from "react-router-dom";
import Paginator from "../common/Paginator/Paginator";
import fileImg from "../../assets/image_file.png"

let Mail = ({totalUsersCount, currentPage, onPageChanged, users, isFetching, updateMails, isAuth}) => {
    return <div>
        <span className={s.buttonUpdateMailsPlace}>
            <button onClick={() => {
                updateMails()
            }}>Обновить почту
            </button>
            </span>
        <div className={s.shadow}>
        <div className={s.letterHead}>
            <span className={s.paginatorMail} >
            <Paginator totalItemsCount={totalUsersCount} currentPage={currentPage} onPageChanged={onPageChanged}
                       pageSize={"10"}/>
            </span>
        </div>
        {users.map(u => <span>
                <NavLink to={'/mail/' + u.id}>
                    <div key={u.id} className={s.letter}>
                        <div className={s.header}>
                            <span className={s.sender}>{u.mailer}</span>
                            <span className={s.time}>
                            {u.date_time}
                            </span>
                        </div>
                        <div className={s.text}>
                            <span className={s.time}>Заголовок: </span>{u.topic}
                            {u.letter[0] === undefined ? "" : <img src={fileImg} />}
                        </div>
                        <div className={s.text}>
                            <span className={s.time}>Текст: </span>{u.text}
                        </div>
                    </div>
                </NavLink>
            </span>
        )
        }
        </div>
    </div>
}


export default Mail