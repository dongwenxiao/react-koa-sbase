import React, { Component, PropTypes } from 'react'
import { ImportStyleRoot, ImportStyleInComponent } from '../../../containers/ImportStyle'
import style from './LinkPage.css'

@ImportStyleRoot()
@ImportStyleInComponent(style)
export default class LinkPage extends Component {

    constructor (props) {
        super(props)
    }

    render () {

        return (
            <div className="link-page">
                {this.props.children}
                <div>Link Page</div>
            </div>
        )
    }
}
