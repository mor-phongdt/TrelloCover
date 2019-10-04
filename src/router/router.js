import Vue from 'vue';
import Router from 'vue-router';
import AuthLayout from '../layouts/Auth.vue';
import CommonLayout from '@/layouts/Common.vue';
import ProjectPage from '@/page/ProjectBoard.vue';
import DetailProjectPage from '@/page/KanbanBoard.vue';
import LoginPage from '../page/auth/Login.vue';
import RegisterPage from '../page/auth/Register.vue';
import NotFoundPage from '../page/error/404.vue';

Vue.use(Router);

// eslint-disable-next-line import/prefer-default-export
export const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/board',
      component: CommonLayout,
      children: [
        {
          path: '', name: 'ProjectPage', component: ProjectPage,
        },
        {
          path: '/board/:id', name: 'DetailProjectPage', component: DetailProjectPage,
        },
      ],
    },
    {
      path: '/',
      component: AuthLayout,
      children: [
        { path: '', name: 'loginPage', component: LoginPage },
        { path: '/register', name:"registerPage" , component: RegisterPage}
      ],
    },
    {
      path: '*',
      component: NotFoundPage
    }
  ],
});


router.beforeEach((to, from, next) => {
  const publicPages = ['/','/register'];
  const authRequired = !publicPages.includes(to.path);
  // kiem tra duong dan co duoc cho phep vao khong
  const loggedIn = localStorage.getItem('user');

  if (authRequired && !loggedIn) {
    return next('/');
  }
  if(to.path ==='/' && loggedIn){
    return next('/board');
  }
  next();
});
