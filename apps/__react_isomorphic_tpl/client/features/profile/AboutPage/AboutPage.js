import React, { Component } from 'react'
import { ImportStyleRoot, ImportStyleInComponent } from '../../../containers/ImportStyle'
import style from './AboutPage.css'

@ImportStyleRoot()
@ImportStyleInComponent(style)
export default class AboutPage extends Component {

    constructor (props) {
        super(props)
    }

    render () {

        return (
            <div className="about-page">
                {this.props.children}
                <div>About Page</div>
            </div>
        )
    }
}
