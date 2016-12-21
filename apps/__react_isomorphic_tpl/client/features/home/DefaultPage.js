import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actions from './redux/actions'
import Button2 from '../../components/Button/Button2'
import { ImportStyleRoot } from '../../containers/ImportStyle'
import style from './DefaultPage.css'

@ImportStyleRoot()
@connect(mapStateToProps, mapDispatchToProps)
export default class DefaultPage extends Component {

    static propTypes = {
        home: PropTypes.object.isRequired,
        actions: PropTypes.object.isRequired
    }

    static fetch (state, dispatch) {
        const fetchTasks = []
        fetchTasks.push(
            dispatch(actions.counterPlusOneAsyncDynamic(state))
        )
        return fetchTasks
    }

    constructor (props) {
        super(props)
    }

    render () {
        return (
            <div>
                <style>{style.toString()}</style>
                Home DefaultPage
                {this.props.home.count}

                <Button2>Button2</Button2>
                <Button2 style={{width: '500px'}}>Button2</Button2>
                <Button2>Button2</Button2>
            </div>
        )
    }
}

function mapStateToProps (state) {
    return {
        home: state.home
    }
}

function mapDispatchToProps (dispatch) {
    return {
        actions: bindActionCreators({...actions }, dispatch)
    }
}
