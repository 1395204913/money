import Vue from 'vue'
import Router from 'vue-router'
import Index from './views/index.vue'
import Register from './views/register.vue'
import NotFound from './views/404NotFound.vue'
import Login from './views/login.vue'
import Home from './views/home.vue'
import UserInfo from './views/userinfo.vue'
import Money from './views/money.vue'
Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: '/index',
      // component: Home
    },
    {
      path: '/index',
      name: 'index',
      component: Index,
      children: [
        {
          path: '', component: Home
        },
        {
          path: '/home', name: 'home', component: Home
        },
        {
          path: '/userinfo', name: 'userinfo', component: UserInfo
        },
        {
          path: '/money', name: 'money', component: Money
        }
        
      ]
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '*',
      name: 'NotFound',
      component: NotFound
    }
  ]
})
// 实现路由守卫
router.beforeEach((to, from, next) => {
  const LoginToken = localStorage.UserToken ? true : false;
  if (to.path == '/login' || to.path == '/register') { next(); }
  else {
    LoginToken ? next() : next('/login');
  }
})
export default router