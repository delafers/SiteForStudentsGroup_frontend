import React from 'react';
import Style from './Header.module.css';

const Header = (props) => {
    return (
        <header>
            <a href="/calendar">календарь</a>
            <a href="/mail">почта</a>
            <a href="/news">новости</a>


        </header>
    );
};

export default Header;