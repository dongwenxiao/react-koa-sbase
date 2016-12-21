import React, { Component } from 'react'

/*
ImportStyle         适用于Page内部的组件
ImportStyleInComponent  适用于Page、Layout
ImportStyleRoot     适用于Page、Layout
*/

export const ImportStyle = (styles) => (StyleWrappedComponent) => {

    class ImportStyle extends Component {

        static contextTypes = {
            appendStyle: React.PropTypes.func
        }

        constructor (props, context) {
            super(props, context)

            this.state = {}
            this.needAppendStyleTag = []
        }

        componentWillMount () {

            // styles = stylesHandle(styles)
            styles = stylesHandleWapperCssLoader(styles)

            let stylesheet = {},
                style = '',
                key = '',
                styleKeyList = [],
                needAppendStyleKeyList = [],
                i = 0,
                count = styles.length

            for (;i < count;i++) {
                style = styles[i]
                key = style.wapper
                stylesheet[key] = style.css
                styleKeyList.push(key)
            }

            needAppendStyleKeyList = this.context.appendStyle(styleKeyList)

            for (i = 0; i < needAppendStyleKeyList.length; i++) {
                key = needAppendStyleKeyList[i]
                style = stylesheet[key]
                this.needAppendStyleTag.push(
                    <style key={key}>{style}</style>
                )
            }

        }

        render () {

            const props = {
                ...this.props,
                ...this.state
            }

            return (
                <StyleWrappedComponent {...props}>
                    {this.needAppendStyleTag}
                    {this.props.children}
                </StyleWrappedComponent>
            )
        }
    }

    return ImportStyle
}

export const ImportStyleInComponent = (styles) => (StyleWrappedComponent) => {

    class ImportStyleInComponent extends Component {

        constructor (props, context) {
            super(props, context)

            this.state = {}
            this.stylesheetTags = []
            this.wapperClasses = []
        }

        componentWillMount () {

            styles = stylesHandleWapperCssLoader(styles)
            this.stylesheetTags = styles.map((style, i) => {
                this.wapperClasses.push(style.wapper)

                // 去掉前后双引号
                let s = style.css
                s = s.substr(1, s.length)
                s = s.substr(0, s.length - 1)

                return (<style dangerouslySetInnerHTML={{__html: s}} key={i}></style>)
            })
        }

        render () {

            const props = {
                ...this.props,
                ...this.state
            }

            return (
                <div className={this.wapperClasses.join(' ')}>
                    <StyleWrappedComponent {...props}>
                        {this.stylesheetTags}
                        {this.props.children}
                    </StyleWrappedComponent>
                </div>
            )
        }
    }

    return ImportStyleInComponent
}

export const ImportStyleRoot = () => (StyleWrappedComponent) => {

    class ImportStyleRoot extends Component {


        constructor (props) {
            super(props)

            this.styleKeyList = []
        }


        static childContextTypes = {
            appendStyle: React.PropTypes.func
        }

        getChildContext = function () {
            return {
                appendStyle: (styleKeyList) => {

                    let needToAppendKeyList = []

                    for (let i = 0; i < styleKeyList.length; i++) {
                        let checkKey = styleKeyList[i]
                        // 不存在
                        if (this.styleKeyList.indexOf(checkKey) <= -1) {
                            needToAppendKeyList.push(checkKey)
                            this.styleKeyList.push(checkKey)
                        }
                    }

                    return needToAppendKeyList
                }
            }
        }

        render () {
            const props = {
                ...this.props,
                ...this.state
            }

            return (
                <StyleWrappedComponent {...props}>
                    {this.props.children}
                </StyleWrappedComponent>
            )
        }
    }

    return ImportStyleRoot
}


// 统一处理，把string,object 都转化成array
const stylesHandleWapperCssLoader = (styles) => {

    // 如果是对象
    if (typeof styles === 'object' && !styles.length) {
        styles = [styles]
    }

    if (typeof styles === 'object' && styles.length) {
        return styles
    }

    throw 'stylesHandleWapperCssLoader() styles type must be array or object'
}
