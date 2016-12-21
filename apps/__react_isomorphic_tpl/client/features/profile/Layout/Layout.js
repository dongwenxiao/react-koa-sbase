import React, { Component } from 'react'
import { ImportStyleInComponent } from '../../../containers/ImportStyle'
import style from './Layout.css'
import Nav from '../Nav'

@ImportStyleInComponent(style)
export default class Layout extends Component {

    constructor (props) {
        super(props)
    }

    render () {

        let links = [
            {text: 'Home', href: '/profile/home'},
            {text: 'About', href: '/profile/about'},
            {text: 'Past', href: '/profile/past'},
            {text: 'Demo', href: '/profile/demo'}
        ]

        return (
            <div className="profile-layout">
                <div className="header">
                    <Nav links={links}></Nav>
                </div>
                <div className="body">
                    {this.props.children}
                </div>
                <div className="footer">
                    This is footer
                </div>
            </div>
        )
    }
}
