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
            if (this.props.token === '') {
                this.props.router.push('/profile/about')
            }
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


    function mapStateToProps (state) {
        return {
            token: state.account.token,
            role: state.account.role,
            userName: state.account.userName
        }
    }

    return Auth
}
