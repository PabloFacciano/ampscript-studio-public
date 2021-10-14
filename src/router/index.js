import { createRouter, createWebHistory } from 'vue-router'
import supabase from '../supabase';
import AppContent from '../components/AppContent.vue'
import AppLogin from '../components/AppLogin.vue'
import store from '@/store/index.js';

const DEFAULT_TITLE = 'AMPScript Studio';

const routes = [
  {
    path: '/',
    name: 'home',
    component: AppContent,
    meta: {
      requiresLogin: true
    }
  },
  {
    path: '/login',
    name: 'login',
    component: AppLogin,
    meta: {
      title: 'Login',
      requiresLogin: false
    }
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  // get current user info
  
  const currentUser = supabase.auth.user();
  const requiresLogin = to.matched.some
  (record => record.meta.requiresLogin);

  if(requiresLogin && currentUser == null){
    next('login');
  } else {
    next();
  }
});

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title + ' · ' + DEFAULT_TITLE || DEFAULT_TITLE
  }
  next()
});

export default router
