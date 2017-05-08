import { combineReducers } from 'redux'
import realtimeLocationReducer from './realtime-location/reducer.js'

export const CHANGE_LANGUAGE = 'CHANGE_LANGUAGE'
export const TELL_ME_URL = 'TELL_ME_URL'
export const LOCATION_UPDATE = 'LOCATION_UPDATE'

let rootReducer = null

export const init = () => {

    if (!rootReducer) {
        rootReducer = createRootReducer()

        // 默认添加一个读取语言的reducer
        add('server', (state = { lang: 'en', origin: '' }, action) => {
            switch (action.type) {
                case CHANGE_LANGUAGE:
                    return Object.assign({}, state, {
                        lang: action.data
                    })
                case TELL_ME_URL:
                    return Object.assign({}, state, {
                        origin: action.data
                    })
                default:
                    return state
            }
        })

        // 默认添加实时react-router location的reducer
        add('location', realtimeLocationReducer)
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