import React from 'react';
import Style from './Header.module.css';
import { Link } from  'react-router-dom'

const Header = (props) => {
    return (
        <header>
            <Link to="/calendar">календарь</Link>
            <Link to="/mail">почта</Link>
            <Link to="/demosnews">суровости</Link>


        </header>
    );
};

export default Header;