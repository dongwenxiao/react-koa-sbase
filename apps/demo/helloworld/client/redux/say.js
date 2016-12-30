import { SAY_HELLO, THINK_1_SECOND } from './constants'


export function sayHello () {
    return (dispatch) => {

        dispatch({
            type: THINK_1_SECOND
        })

        // 请求数据
        return new Promise(async (resolve, reject) => {

            let data = 'hello'

            try {

                setTimeout(() => {

                    dispatch({
                        type: SAY_HELLO,
                        data
                    })

                    resolve(data)
                }, 1000)

            } catch (err) {

                data = 'fuck'

                dispatch({
                    type: SAY_HELLO,
                    data
                })

                reject(err)
            }
        })
        .catch(() => {
            console.log('貌似不会走到这里，异常处理已经由try catch搞了')
        })

    }
}



export function reducer (state, action) {
    switch (action.type) {
        case THINK_1_SECOND:
            console.log(action)
            return {
                ...state,
                loading: true
            }
        case SAY_HELLO:
            console.log(action)

            alert(action.data)

            return {
                ...state,
                word: action.data,
                loading: false
            }
        default:
            return state
    }
}
