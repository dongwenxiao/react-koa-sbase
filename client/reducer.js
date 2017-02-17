import { combineReducers } from 'redux'

export const CHANGE_LANGUAGE = 'CHANGE_LANGUAGE'

let rootReducer = null

export const init = () => {

    if (!rootReducer) {
        rootReducer = createRootReducer()

        // 默认添加一个读取语言的reducer
        add('lang', (state = 'en', action) => {
            switch (action.type) {
                case CHANGE_LANGUAGE:
                    return action.data
                default:
                    return state
            }
        })
    }

    return rootReducer
}

function createRootReducer() {
    return {}
}

export const add = (name, reducer) => {

    let extendReducer = {}
    extendReducer[name] = reducer

    Object.assign(rootReducer, extendReducer)
    return rootReducer
}

export const get = () => combineReducers(rootReducer)