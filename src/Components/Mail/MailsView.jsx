import React from "react";
import s from './Mail.module.css'
import {NavLink} from "react-router-dom";

let Mail = (props) => {

    let pagesCount = Math.ceil(props.totalUsersCount / 10)

    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }
    debugger
    return <div>
        <div className={s.letterHead}>
            {pages.map(p => {
                return <span className={props.currentPage === p && s.activePage}
                             onClick={(e) => {
                                 props.onPageChanged(p)
                             }}
                >{p}</span>
            })}
        </div>
        {props.users.map(u => <div key={u.id} className={s.letter}>
                <NavLink to={'/mail/' + u.id}>
                    <div className={s.text}>
                        {u.mailer}
                    </div>
                    <div className={s.text}>
                        {u.topic}
                    </div>
                    <div className={s.text}>

                    </div>
                    <div>
                        {u.letter.file ? u.letter.file : ""}
                    </div>
                </NavLink>
            </div>
        )

        }
    </div>
}


export default Mail