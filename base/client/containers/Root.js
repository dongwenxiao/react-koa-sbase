import React from 'react'
import { Provider } from 'react-redux'
import { Router } from 'react-router'

export default class Root extends React.Component {
    render () {
        const {store, history, routes} = this.props

        return (
            <Provider store={store}>
                <Router {...{history, routes}} ></Router>
            </Provider>
        )
    }
}
