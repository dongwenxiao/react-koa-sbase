import React, { Component } from 'react'
import {ImportStyle} from '../../containers/ImportStyle'

const css = require('./Button.css').toString()
@ImportStyle(css)
export default class Button2 extends Component {
    render () {
        return (
            <div>
                <button style={this.props.style}>{this.props.children}</button>
            </div>
        )
    }
}
