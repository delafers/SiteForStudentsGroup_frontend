import {useState} from "react";
import React from "react";

const Profile = (props) => {
    debugger
    const [isActive, setActive] = useState(false)
    return<div>
            <h1>
                Profile
            </h1>
        {props?.user}
        </div>

}
export default Profile