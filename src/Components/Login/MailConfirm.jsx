import React from "react";
import {NavLink} from "react-router-dom";


const Confirm = () => {
    return(
        <div>
            Successful authorised
            <div>
                <NavLink to={"/login"}>
                    return to login
                </NavLink>
            </div>
        </div>

    )
}

export default Confirm