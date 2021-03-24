import React, { Component } from 'react';
import MenuToggle from "../Navigation/MenuToggle/MenuToggle";
import Drawer from "../Navigation/Drawer/Drawer";

export default class Layout extends Component {

    state = {
        menu: false
    }

    onToggle = () => {
        this.setState({
            menu: !this.state.menu
        })
    }

    onCloseHandler = () => {
        this.setState({
            menu: false
        })
    }

    render() {

        const isOpen = this.state.menu;

        return (
            <div className="app-layout">
                <Drawer
                    isOpen={isOpen}
                    onCloseHandler={this.onCloseHandler}
                />
                <MenuToggle
                    onToggle={this.onToggle}
                    isOpen={isOpen}
                />
                <main className="app-layout-main">
                    { this.props.children }
                </main>
            </div>
        )
    }
}
