import { LOGIN_WAIT, LOGIN_SUCCESS, LOGIN_FAIL } from './constants'

/*
1. do login
    fetch data
    dispatch login wait

2. login wait
    add loading

3. login success/fail
    remove loading
    other logic
*/

export function doLogin (user) {

    return (dispatch) => {
        // 先设置一下loading状态
        dispatch({
            type: LOGIN_WAIT
        })

        // 请求数据
        return new Promise(async (resolve, reject) => {
            try {

                setTimeout(() => {

                    // 测试数据
                    const data = {
                        token: 'xxxxxxxxxxxx',
                        username: 'victor',
                        role: 'user'
                    }

                    dispatch({
                        type: LOGIN_SUCCESS,
                        data
                    })

                    resolve(data)
                }, 1000)

                /*
                后续再写，暂时用setTimeout代替
                const res = await fetch('http://www.reddit.com/r/reactjs.json')
                if (res.ok) {

                    const data = await res.json()
                    dispatch({
                        type: LOGIN_SUCCESS,
                        data
                    })

                    resolve(data)
                } else {
                    throw new Error(res)
                }*/

            } catch (err) {
                dispatch({
                    type: LOGIN_FAIL,
                    data: {}
                })

                reject(err)
            }
        })
        .catch(() => {
            console.log('貌似不会走到这里，异常处理已经由try catch搞了')
        })

    }

}

export function loginSuccess () {
    return {
        type: LOGIN_SUCCESS
    }
}

export function loginFail () {
    return {
        type: LOGIN_FAIL
    }
}


export function reducer (state, action) {
    switch (action.type) {
        case LOGIN_WAIT:
            console.log(action)
            return {
                ...state,
                loading: true
            }
        case LOGIN_SUCCESS:
            console.log(action)
            return {
                ...state,
                loading: false
            }
        case LOGIN_FAIL:
            console.log(action)
            return {
                ...state,
                loading: false
            }
        default:
            return state
    }
}
