// App
import { createApp, defineAsyncComponent } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import AppNavbar from './components/AppNavbar.vue';
import AppLibrary from './components/AppLibrary.vue';
import AppContent from './components/AppContent.vue';
import AppLogin from './components/AppLogin.vue';
import AppHome from './components/AppHome.vue';

import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"

// Components
import {Tabs, Tab} from 'vue3-tabs-component';


/* App */
createApp(App)
.use(store)
.use(router)
.component('app-navbar', AppNavbar)
.component('app-content', AppContent)
.component('app-library', AppLibrary)
.component('app-login', AppLogin)
.component('app-home', AppHome)
/* Components */
.component('tabs', Tabs)
.component('tab', Tab)
.component('code-editor', defineAsyncComponent( () => import(/* webpackPrefetch: true */ '@/components/CodeEditor.vue') ))
.component('run-history', defineAsyncComponent( () => import(/* webpackPrefetch: true */ '@/components/RunHistory.vue') ))
.component('settings', defineAsyncComponent( () => import(/* webpackPrefetch: true */ '@/components/Settings.vue') ))
.mount('#app')
