import { TIME_PASSED } from './constants'

const ONE_SECOND = 1000

export function timePassed () {
    return {
        type: TIME_PASSED
    }
}

export function timePassedForever () {
    return (dispatch) => new Promise((resolve, reject) => {
        const st = setTimeout(() => {
            clearTimeout(st)
            // timePassedForever()
            resolve()
        }, ONE_SECOND)
    }).then(() => {
        dispatch({
            type: TIME_PASSED
        })
    })
}


export const reducer = (state, action) => {

    switch (action) {
        case TIME_PASSED:
            return state + 1
        default:
            return state
    }

}

