import Vue from 'vue';
import Router from 'vue-router';
import CommonLayout from '@/layouts/Common.vue';
import ProjectPage from '@/page/ProjectBoard.vue';
import DetailProjectPage from '@/page/KanbanBoard.vue';

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
  ],
});

// eslint-disable-next-line consistent-return
// router.beforeEach((to, from, next) => {
//   const publicPages = ['/'];
//   const authRequired = !publicPages.includes(to.path);
//   // kiem tra duong dan co duoc cho phep vao khong
//   const loggedIn = localStorage.getItem('user');

//   if (authRequired && !loggedIn) {
//     return next('/');
//   }

//   next();
// });
