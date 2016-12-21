/*
import Button from './Button'
import { LazilyLoadFactory } from '../../containers/LazilyLoad'
export default LazilyLoadFactory(Button, {
    highlight: () => System.import('./test')
});*/


// if (__SERVER__) {
// require('./Button.css')
// }

/*
import Button from './Button'

Button.customCss = () =>{
    console.log('<><><><><><><><><><><><><>  customCss')
}

if (__CLIENT__) {
    require('style-loader/url!file-loader!./Button.css')
}
export default Button*/

// System.import('./')
// require.ensure(['style-loader/url!file-loader!./Button.css'], function (require) {
//     require('Button')
// })


/*

if (__CLIENT__) {
    require(['./Button.css'], () => {
        module.exports = Button
    })
}

if (__SERVER__) {
    require('./Button.css')
    module.exports = Button
}

*/


import React, { Component } from 'react'
// import { connect } from 'react-redux'
import Button from './Button'
import { APPEND_STYLE } from '../../containers/StyleCollection'

// @connect()
export default class _C extends Component {

    constructor(props, context) {
        super(props, context)
        // console.log('constructor：：：：：：')
        // console.log(context)
    }

    static contextTypes = {
        css: React.PropTypes.string,
        addCss: React.PropTypes.func,
        color: React.PropTypes.string
    }

    /*
    static customCss(state, dispatch) {
        const css = require('./Button.css')

        dispatch({
            type: APPEND_STYLE,
            style: css
        })
    }*/

    componentWillMount() {


        // console.log('==========>')

        const css = require('./Button.css')

        // console.log('this.context1')
        // console.log(this.context)
        // this.context.addCss(css)

        // this.props.dispatch({
        //     type: APPEND_STYLE,
        //     style: css
        // })

        // console.log('==========>11')
    }

    render() {

        // console.log('this.context2')
        // console.log(this.context)

        return (
            <Button {...this.prop}>{this.props.children}</Button>
        )
    }
}
