import React, { Component } from 'react';
import BackDrop from "../../Elements/BackDrop/BackDrop";
import classes from './drawer.module.scss';

const links = [
    1,2,3
]

export default class Drawer extends Component {

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
                            links.map((link, index) => {
                                return (
                                    <li key={index}
                                        className={classes['drawer__item']}
                                    >
                                        <div>
                                            Link: { link }
                                        </div>
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
