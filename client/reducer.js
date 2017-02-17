import { combineReducers } from 'redux'

export const CHANGE_LANGUAGE = 'CHANGE_LANGUAGE'

let rootReducer = null

export const init = () => {
    if (!rootReducer) {
        rootReducer = createRootReducer()
    }
    return rootReducer
}

function createRootReducer() {
    return {
        lang: (state, action) => {
            switch (action.type) {
                case CHANGE_LANGUAGE:
                    return action.data
                default:
                    return 'en'
            }

        }

    }
}

export const add = (name, reducer) => {
    init()

    let extendReducer = {}
    extendReducer[name] = reducer

    Object.assign(rootReducer, extendReducer)
    return rootReducer
}

export const get = () => {
    // if (!rootReducer) return null
    return combineReducers(rootReducer)
}