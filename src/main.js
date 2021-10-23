// App
import { createApp } from 'vue'
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
import CodeEditor from './components/CodeEditor.vue';
import RunHistory from './components/RunHistory.vue';
import Settings from './components/Settings.vue';

/* ------------ */
// Load workspaces on app loading
store.dispatch('loadWorkspaces');

/* ------------ */

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
.component('code-editor', CodeEditor)
.component('run-history', RunHistory)
.component('settings', Settings)
.mount('#app')
