import React from "react";
import {NavLink} from "react-router-dom";
import s from "./login.module.css"

const Confirm = () => {
    return(
        <div className={s.center}>
            <h1>
               You have been successful authorised
            </h1>
            <div>
                <p>
                    <NavLink to={"/login"}>
                        return to login
                    </NavLink>
                </p>
            </div>
        </div>

    )
}

export default Confirm