import React from "react";
import s from './Mail.module.css'
import {NavLink} from "react-router-dom";
import Paginator from "../common/Paginator/Paginator";

let Mail = ({totalUsersCount, currentPage, onPageChanged, users, isFetching}) => {
    return <div>
        <div className={s.letterHead}>
            <Paginator totalItemsCount={totalUsersCount} currentPage={currentPage} onPageChanged={onPageChanged} pageSize={"10"} />
            <button onClick={() => {}}>Update mails list</button>
        </div>
        {users.map(u => <div key={u.id} className={s.letter}>
                <NavLink to={'/mail/' + u.id}>
                    <div className={s.text}>
                        {u.mailer}
                        <span className={s.time}>
                            {u.date_time}
                        </span>
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