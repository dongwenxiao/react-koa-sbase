import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import { ImportStyleInComponent } from '../../../containers/ImportStyle'
import style from './Nav.css'

@ImportStyleInComponent(style)
export default class Nav extends Component {

    static propTypes = {
        links: PropTypes.array.isRequired
    }

    constructor (props) {
        super(props)
    }

    render () {

        let linksTag = this.props.links.map((link, i) => (
            <li key={i}>
                <Link to={link.href}>{link.text}</Link>
            </li>
        ))

        return (
            <div className="nav">
                {this.props.children}
                {linksTag}
            </div>
        )
    }
}
