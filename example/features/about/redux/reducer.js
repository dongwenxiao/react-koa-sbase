import { initialState } from './initialState'
import { reducer as myLogicReducer } from './myLogic'

const reducers = [
    myLogicReducer
]

/**
 * 分发到每一个子reducer中处理
 * @param  {[type]} state  [description]
 * @param  {[type]} action [description]
 * @return {[type]}        [description]
 */
export default function reducer (state = initialState, action) {
    return reducers.reduce((s, r) => r(s, action), state)
}
