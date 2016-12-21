import React, { Component, PropTypes } from 'react'
import { ImportStyleRoot, ImportStyleInComponent } from '../../../containers/ImportStyle'
import style from './PastPage.css'

@ImportStyleRoot()
@ImportStyleInComponent(style)
export default class PastPage extends Component {

    constructor (props) {
        super(props)
    }

    render () {

        return (
            <div className="past-page">
                {this.props.children}
                <div>Past Page</div>
            </div>
        )
    }
}
