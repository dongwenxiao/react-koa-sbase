import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
// import * as actions from './redux/actions'
import { ImportStyleRoot, ImportStyleInComponent } from '../../../containers/ImportStyle'
import style from './HomePage.css'

@ImportStyleRoot()
@ImportStyleInComponent(style)
@connect(mapStateToProps)
export default class HomePage extends Component {

    constructor (props) {
        super(props)
    }

    render () {

        return (
            <div className="home-page">
                {this.props.children}
                <div>Home Page</div>
            </div>
        )
    }
}

function mapStateToProps (state) {
    return {
        homePage: state.homePage
    }
}

// function mapDispatchToProps (dispatch) {
//     return {
//         actions: bindActionCreators({...actions }, dispatch)
//     }
// }
