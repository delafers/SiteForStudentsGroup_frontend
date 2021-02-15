import React from "react";
import s from './Mail.module.css'

let Mail = (props) => {

    let pagesCount = Math.ceil(props.totalUsersCount / 2)

    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }

    return <div>
        <div>
            {pages.map(p => {
                return <span className={props.currentPage === p && s.activePage}
                             onClick={(e) => {
                                 props.onPageChanged(p)
                             }}
                >{p}</span>
            })}
        </div>
        {
            props.users.map(u => <div className={s.letter}>
                <div>
                    {u.mailer}
                </div>
                <div>
                    {u.topic}
                </div>
                <div>
                    {u.text}
                    {u.id}
                </div>
                </div>
                )

        }
    </div>
}


export default Mail