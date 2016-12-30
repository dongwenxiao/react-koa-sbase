import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'


export default function factoryRootReducer (reducers) {

    let resultReducers = { routing: routerReducer }

    reducers.forEach((reducer) => {
        Object.assign(resultReducers, reducer)
    })

    const rootReducer = combineReducers(resultReducers)

    return rootReducer
}
