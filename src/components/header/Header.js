import React from "react";
import { NavLink } from "react-router-dom";
import mainRoutes from "../../routes/MainRoutes";
import styles from "./Header.module.css";

const Header = () => {
    return (

        <div className={styles.header}>
            <ul className={styles.header_list}>
                {mainRoutes.map(({ path, name, exact }) => (
                    <li className={styles.header_listItem} key={path} >
                        <NavLink
                            to={path}
                            exact={exact}
                            className={styles.header_listItemLink}
                            activeClassName={styles.header_listItemLink_active}
                        >
                            {name}
                        </NavLink>
                    </li>
                ))}
            </ul>
        </div >

    );
};

export default Header;