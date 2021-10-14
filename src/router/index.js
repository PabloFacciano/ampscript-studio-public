import { createRouter, createWebHistory } from 'vue-router'
import supabase from '../supabase';
import AppContent from '../components/AppContent.vue'
import AppLogin from '../components/AppLogin.vue'
import store from '@/store/index.js';

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

export default router
