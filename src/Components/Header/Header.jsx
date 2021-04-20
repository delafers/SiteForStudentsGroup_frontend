import React, { Component } from 'react';
import Style from './Header.module.css';
import {Link, NavLink} from 'react-router-dom'


const Header =  (props) => {
        console.log(props.isAuth)
        return (
            <header>
                <NavLink to="/calendar">календарь</NavLink>
                <NavLink to="/mail">почта</NavLink>
                <NavLink to="/demosnews">суровости</NavLink>
                    {props.isAuth
                        ? <a>{props.username}  <button>Log out</button></a>
                        : <NavLink to='/login' >Profile</NavLink>}
            </header>
        );
}


export default Header;