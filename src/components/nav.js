import React from "react";
import { NavLink } from 'react-router-dom';
import styles from '../components/app.module.css';

const activeStyle = {
    color: '#F1003C'
}
const Nav = () => (
    <div className={styles['nav-wrapper']}>
        <ul className={styles.nav}>
            <li className={styles['nav-li']}>
                <NavLink to="/" exact activeStyle={activeStyle} className={styles['nav-link']}>Home</NavLink>
            </li>
            <li className={styles['nav-li']}>
                <NavLink to="/movies" activeStyle={activeStyle} className={styles['nav-link']}>Movies</NavLink>
            </li>
        </ul>
    </div>
)
export default Nav;