import Layout from '../../components/layout';

export default {
  path: '/test',
  component: Layout,
  redirect: '/test/index',
  meta: { title: '测试', icon: 'el-icon-s-opportunity' },
  children: [
    {
      path: 'index',
      name: 'test',
      component: () => import('../../views/test/index'),
      meta: { title: 'test', icon: 'el-icon-s-opportunity' }
    }
  ]
};
