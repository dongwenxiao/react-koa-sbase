import React, { Component } from 'react'
import { connect } from 'react-redux'

export const ROLE_USER = 'ROLE_USER'
export const ROLE_ADMIN = 'ROLE_ADMIN'
export const ROLE_ANYONE = 'ROLE_ANYONE'

export const Auth = (role = ROLE_USER) => (AuthWrappedComponent) => {

    @connect(mapStateToProps)
    class Auth extends Component {

        static contextTypes = {

        }

        constructor (props, context) {
            super(props, context)
        }

        componentWillMount () {

        }

        componentWillReceiveProps (nextProps) {

        }

        render () {
            return (
                <AuthWrappedComponent {...this.props}>
                    {this.props.children}
                </AuthWrappedComponent>
            )
        }
    }


    const mapStateToProps = (state) => ({
        token: state.auth.token,
        userName: state.auth.userName,
        isAuthenticated: state.auth.isAuthenticated
    })


    return Auth
}
