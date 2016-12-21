import initialState from './initialState'
import { reducer as counterPlusOne } from './counterPlusOne'
import { reducer as counterPlusOneAsync } from './counterPlusOneAsync'

const reducers = [
    counterPlusOne,
    counterPlusOneAsync
]

/**
 * 分发到每一个子reducer中处理
 * @param  {[type]} state  [description]
 * @param  {[type]} action [description]
 * @return {[type]}        [description]
 */
export default function reducer(state = initialState, action) {
    let newState;
    switch (action.type) {
        default: newState = state
        break
    }

    return reducers.reduce((s, r) => r(s, action), newState)
}
