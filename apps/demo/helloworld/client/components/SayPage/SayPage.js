import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actions from '../../redux/actions'
import { ImportStyleRoot, ImportStyleInComponent } from 'ImportStyle'
import style from './SayPage.css'

@ImportStyleRoot()
@ImportStyleInComponent(style)
@connect(mapStateToProps, mapDispatchToProps)
export default class SayPage extends Component {

    constructor (props) {
        super(props)
    }

    render () {

        // console.log(this.props)

        return (
            <div>
                {this.props.children}
                <div>Say Page</div>
                <button onClick={this.handleButtonClick.bind(this)}>Say Something</button>
                {this.props.loading && <div>Thinking...</div>}
            </div>
        )
    }

    handleButtonClick () {
        this.props.actions.sayHello()
    }
}

function mapStateToProps (state) {

    return {
        loading: state.helloworld.loading,
        word: state.helloworld.word
    }
}

function mapDispatchToProps (dispatch) {
    return {
        actions: bindActionCreators({...actions }, dispatch)
    }
}
