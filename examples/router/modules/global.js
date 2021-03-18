import Layout from '../../components/layout';

export default {
  path: '/global',
  component: Layout,
  redirect: '/global/banner',
  meta: { title: '测试', icon: 'el-icon-s-opportunity' },
  children: [
    {
      path: 'banner',
      name: 'global',
      component: () => import('../../views/global/banner'),
      meta: { title: 'banner', icon: 'el-icon-s-opportunity' }
    }
  ]
};
