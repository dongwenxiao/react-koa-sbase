import { combineReducers } from 'redux'

let rootReducer = null

export const init = () => {
    if (!rootReducer) rootReducer = {}
    return rootReducer
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
