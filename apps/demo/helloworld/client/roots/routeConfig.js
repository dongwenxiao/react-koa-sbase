import App from '../containers/App'
import { PageNotFound } from '../components'
import { Test } from '../components'

const routes = {
    path: '', // 在feature暴露index.js里配置了
    component: App,
    childRoutes: [
        { path: 'react', name: 'Page not found', component: Test },
        { path: '*', name: 'Page not found', component: PageNotFound }
    ]
}


export default routes
