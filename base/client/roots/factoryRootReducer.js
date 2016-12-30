import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
// import homeReducer from '../features/home/redux/reducer'
// import {reducer as accountReducer} from '../features/account'




export default function factoryRootReducer (childReducer) {

    const rootReducer = combineReducers({
        routing: routerReducer,
        ...childReducer
        // home: homeReducer,
        // account: accountReducer
    })

    return rootReducer
}
