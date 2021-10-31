import { createRouter, createWebHistory } from 'vue-router'
import supabase from '../supabase';
import AppContent from '../components/AppContent.vue'
import AppLogin from '../components/AppLogin.vue'
import store from '@/store/index.js';

const DEFAULT_TITLE = 'AMPScript Studio';

const routes = [
  {
    path: '/login',
    name: 'login',
    component: AppLogin,
    meta: {
      title: 'Login · ' + DEFAULT_TITLE,
      requiresLogin: false,
    }
  },
  {
    path: '/',
    name: 'home',
    component: AppContent,
    meta: {
      title: DEFAULT_TITLE,
      requiresLogin: true,
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  // get current user info
  
  const currentUser = store.state.user;
  const requiresLogin = to.matched.some
  (record => record.meta.requiresLogin);

  if(requiresLogin && currentUser == null){
    next('login');
  } else {
    next();
  }
  
  next();
});

router.afterEach((to,from,next) => {
  if (to.meta.title) {
    document.title = to.meta.title;
  }
});

export default router
