import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actions from '../redux/actions'
import { ImportStyleRoot, ImportStyleInComponent } from '../../../containers/ImportStyle'
import style from './LoginPage.css'

@ImportStyleRoot()
@ImportStyleInComponent(style)
@connect(mapStateToProps, mapDispatchToProps)
export default class LoginPage extends Component {

    constructor (props) {
        super(props)
    }

    render () {

        return (
            <div>
                {this.props.children}
                <div>Account Login Page</div>
                <input ref="txtUsername" type="text" placeholder="Username"/> <br />
                <input ref="txtPassword" type="text" placeholder="Password"/> <br />
                <button onClick={this.handleLoginButtonClick.bind(this)}>do Login</button>
                {this.props.loading && <div>Loading...</div>}
            </div>
        )
    }

    handleLoginButtonClick () {
        let username = this.refs.txtUsername.value,
            password = this.refs.txtPassword.value

        this.props.actions.doLogin({username, password})

    }
}

function mapStateToProps (state) {
    return {
        loading: state.account.loading
    }
}

function mapDispatchToProps (dispatch) {
    return {
        actions: bindActionCreators({...actions }, dispatch)
    }
}
