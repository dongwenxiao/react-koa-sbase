import React, { Component, PropTypes } from 'react'
import { ImportStyleRoot, ImportStyleInComponent } from '../../../containers/ImportStyle'
import style from './DemoPage.css'

@ImportStyleRoot()
@ImportStyleInComponent(style)
export default class DemoPage extends Component {

    constructor (props) {
        super(props)
    }

    render () {

        return (
            <div className="demo-page">
                {this.props.children}
                <div>Demo Page</div>
            </div>
        )
    }
}
