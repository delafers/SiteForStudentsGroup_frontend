import React, { Component } from 'react';
import Style from './Header.module.css';
import {Link, NavLink} from 'react-router-dom'
import AuthorizationService from '../Services/AuthorizationService.js';

const authorizationService = new AuthorizationService();


class Header extends Component {

    constructor(props) {
        super(props);
        this.state = {

        };
        // this.loadMore = this.loadMore.bind(this);
    }


    render() {
        return (
            <header>
                <NavLink to="/calendar">календарь</NavLink>
                <NavLink to="/mail">почта</NavLink>
                <NavLink to="/demosnews">суровости</NavLink>
                <NavLink to="/login">login</NavLink>
                <NavLink to="/registrate">auth</NavLink>
            </header>
        );
    }
}

export default Header;