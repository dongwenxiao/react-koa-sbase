import initState from './initState'
import { reducer as loginReducer } from './login'

const reducers = [
    loginReducer
]

/**
 * 分发到每一个子reducer中处理
 * @param  {[type]} state  [description]
 * @param  {[type]} action [description]
 * @return {[type]}        [description]
 */
export default function reducer (state = initState, action) {

    let newState = state

    // switch (action.type) {
    //     default:
    //         newState = state
    //         break
    // }

    return reducers.reduce((s, r) => r(s, action), newState)
}
