import React from 'react'
import { Provider } from 'react-redux'
import { Router } from 'react-router'
import routeConfig from '../common/routeConfig'


export default class Root extends React.Component {
    render () {
        const {store, history} = this.props

        if (!this.routeConfig) this.routeConfig = routeConfig

        return (
            <Provider store={store}>
                <Router history={history} routes={this.routeConfig}></Router>
            </Provider>
        )
    }
}
