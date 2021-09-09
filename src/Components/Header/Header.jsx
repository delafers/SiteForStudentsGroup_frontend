import React  from 'react';
import s from './Header.module.css';
import { NavLink} from 'react-router-dom'


const Header =  (props) => {
        return (
            <header className={s.item}>
                <NavLink exact to="/" activeClassName={s.active}>календарь</NavLink>
                <NavLink to="/mail" activeClassName={s.active}>почта</NavLink>
                <NavLink to="/demosnews" activeClassName={s.active}>суровости</NavLink>
                    <span className={s.loginPlace}>
                    {props.isAuth
                        ? <span>{props.username}  <button onClick={props.logout}>Выйти</button></span>
                        : <NavLink to='/login' activeClassName={s.active} >Авторизация</NavLink>}
                    </span>
            </header>
        );
}
export default Header;