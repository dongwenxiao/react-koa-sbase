import fetch from 'isomorphic-fetch'
import { COUNTER_PLUS_ONE_ASYNC } from './constants'

export function counterPlusOneAsyncDynamic(state) {

    return (dispatch) => {
        if (state && state.requestData) {
            return dispatch(counterPlusOneAsync(state.requestData))
        }

        return dispatch(dispatch => new Promise((reslove, reject) => {
            let st = setTimeout(() => {

                reslove(1)
                clearTimeout(st)
            }, 30)
        }).then(data => dispatch(counterPlusOneAsync(data))))
    }
}

export function counterPlusOneAsync(data) {

    return {
        type: COUNTER_PLUS_ONE_ASYNC,
        data
    }
}

export function reducer(state, action) {
    switch (action.type) {
        
        case COUNTER_PLUS_ONE_ASYNC:
            return {
                ...state,
                count: state.count + action.data
            }

        default:
            return state
    }
}
