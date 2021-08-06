import React from "react";
import {Field} from "redux-form";
import s from "./FormsControls.module.css"

export const Input = ({input, meta, ...props}) => {
    const hasErrorZeroLength = meta.touched && meta.error
    return(
        <div className={s.formControl + " " + (hasErrorZeroLength ? s.error : "")}>
            <input {...input} {...props}/>
            {hasErrorZeroLength && <span>{meta.error}</span>}
        </div>
    )
}
export const createField = (placeholder, name, validators, component, type={}, props={}, text="") => {
    return <span>
        <Field placeholder={placeholder} name={name}
               validate={validators} component={component} type={type} {...props}/>{text}
    </span>
}