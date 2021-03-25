import React, { Component } from 'react';
import BackDrop from "../../Elements/BackDrop/BackDrop";
import navList from '../../../constants/Navigation/NavList';
import classes from './drawer.module.scss';
import { NavLink } from "react-router-dom";

export default class Drawer extends Component {

    clickHandler = () => {
        this.props.onCloseHandler()
    }

    render() {

        const drawerClasses = [classes.drawer];

        if (!this.props.isOpen) {
            drawerClasses.push(classes['drawer_close'])
        }

        return (
            <>
                <nav className={drawerClasses.join(' ')}>
                    <ul className={classes['drawer__list']}>
                        {
                            navList.map((link, index) => {
                                return (
                                    <li key={index}
                                        className={classes['drawer__item']}
                                    >
                                        <NavLink
                                            className={classes['drawer__link']}
                                            exact={link.exact}
                                            to={link.route}
                                            onClick={this.clickHandler}
                                        >
                                             { link.text }
                                        </NavLink>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </nav>
                {
                    this.props.isOpen ? <BackDrop onCloseHandler={this.props.onCloseHandler}/> : null
                }
            </>
        )
    }
}
