import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import homeReducer from '../features/home/redux/reducer'
import {reducer as accountReducer} from '../features/account'


const rootReducer = combineReducers({
    routing: routerReducer,
    home: homeReducer,
    account: accountReducer
})

export default rootReducer
