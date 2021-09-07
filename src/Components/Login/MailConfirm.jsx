import React from "react";
import {NavLink} from "react-router-dom";
import s from "./login.module.css"

const Confirm = () => {
    return(
        <div className={s.center}>
            <h1>
               Вы были успешно авторизованы
            </h1>
            <div>
                <p>
                    <NavLink to={"/login"}>
                        Вернуться к авторизации
                    </NavLink>
                </p>
            </div>
        </div>

    )
}

export default Confirm