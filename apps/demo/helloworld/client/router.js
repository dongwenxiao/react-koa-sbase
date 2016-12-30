import App from './containers/App'
import { PageNotFound, Test, SayPage } from './components'

export default {
    path: '', // 在feature暴露index.js里配置了
    component: App,
    childRoutes: [
        { path: 'react', name: 'react', component: Test },
        { path: 'say', name: 'say', component: SayPage },
        { path: '*', name: 'Page not found', component: PageNotFound }
    ]
}
