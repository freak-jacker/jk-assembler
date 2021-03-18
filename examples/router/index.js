import Vue from 'vue';
import VueRouter from 'vue-router';
import Layout from '../components/layout';

Vue.use(VueRouter);

const modulesFiles = require.context('./modules', true, /\.js$/);
const modules = modulesFiles.keys().reduce((acc, modulePath) => {
  const value = modulesFiles(modulePath);
  acc.push(value.default);
  return acc;
}, []);

console.log('modules: ', modules);
export const routes = [
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [
      {
        path: '/home',
        name: 'homePage',
        component: () => import('../views/index'),
        meta: { title: '首页', icon: 'el-icon-s-opportunity' }
      }
    ]
  },

  ...modules
];

const router = new VueRouter({
  routes
});

export default router;
