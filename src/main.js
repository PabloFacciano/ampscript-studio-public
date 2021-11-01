// App
import { createApp, defineAsyncComponent } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"

// Components
import {Tabs, Tab} from 'vue3-tabs-component';

/* App */
createApp(App)
.use(store)
.use(router)
.component('app-navbar', defineAsyncComponent( () => import(/* webpackPrefetch: true */ '@/components/AppNavbar.vue') ))
.component('app-content', defineAsyncComponent( () => import(/* webpackPrefetch: true */ '@/components/AppNavbar.vue') ))
.component('app-library', defineAsyncComponent( () => import(/* webpackPrefetch: true */ '@/components/AppLibrary.vue') ))
.component('app-login', defineAsyncComponent( () => import(/* webpackPrefetch: true */ '@/components/AppLogin.vue') ))
.component('app-home', defineAsyncComponent( () => import(/* webpackPrefetch: true */ '@/components/AppHome.vue') ))
/* Components */
.component('tabs', Tabs)
.component('tab', Tab)
.component('salesforce-data', defineAsyncComponent( () => import(/* webpackPrefetch: true */ '@/components/SalesforceData.vue') ))
.component('code-editor', defineAsyncComponent( () => import(/* webpackPrefetch: true */ '@/components/CodeEditor.vue') ))
.component('run-history', defineAsyncComponent( () => import(/* webpackPrefetch: true */ '@/components/RunHistory.vue') ))
.component('settings', defineAsyncComponent( () => import(/* webpackPrefetch: true */ '@/components/Settings.vue') ))
.mount('#app')
