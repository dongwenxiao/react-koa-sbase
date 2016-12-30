import React, { Component } from 'react'
import {ImportStyleInComponent} from 'ImportStyle'
import style from './App.css'
import resetStyle from './reset'

@ImportStyleInComponent([resetStyle, style])
export default class App extends Component {
    render () {
        return (
            <div>
                {this.props.children}
            </div>
        )
    }
}
