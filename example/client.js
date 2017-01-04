import thunk from 'redux-thunk'
import { browserHistory } from 'react-router'
import { routerMiddleware } from 'react-router-redux'
import { routerReducer } from 'react-router-redux'
import { redux, createConfigureStore, router, run } from '../super-base/client'
import { reducer, route } from './features/about'

// redux middleware
redux.use(thunk)
redux.use(routerMiddleware(browserHistory))

// redux reducer
redux.reducer.use('routing', routerReducer)
redux.reducer.use('about', reducer)

// react-router
router.use(route)

//
if (__CLIENT__) run()

//
export {
    router,
    createConfigureStore
}
