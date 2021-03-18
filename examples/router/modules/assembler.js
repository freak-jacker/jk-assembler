import Layout from '../../components/layout';

export default {
  path: '/assembler',
  component: Layout,
  redirect: '/assembler/assembler',
  meta: { title: '集成组件', icon: 'el-icon-s-opportunity' },
  children: [
    {
      path: 'assembler',
      name: 'assembler',
      component: () => import('../../views/assembler/assembler'),
      meta: { title: 'assembler', icon: 'el-icon-s-opportunity' }
    },
    {
      path: 'filter',
      name: 'assemblerfilter',
      component: () => import('../../views/assembler/filter'),
      meta: { title: 'filter', icon: 'el-icon-s-opportunity' }
    },
    {
      path: 'form',
      name: 'assemblerform',
      component: () => import('../../views/assembler/form'),
      meta: { title: 'form', icon: 'el-icon-s-opportunity' }
    },
    {
      path: 'form-panel',
      name: 'assemblerform-panel',
      component: () => import('../../views/assembler/form-panel'),
      meta: { title: 'form-panel', icon: 'el-icon-s-opportunity' }
    },
    {
      path: 'table',
      name: 'assemblertable',
      component: () => import('../../views/assembler/table'),
      meta: { title: 'table', icon: 'el-icon-s-opportunity' }
    },
    {
      path: 'pagination',
      name: 'assemblerpagination',
      component: () => import('../../views/assembler/pagination'),
      meta: { title: 'pagination', icon: 'el-icon-s-opportunity' }
    }
  ]
};
