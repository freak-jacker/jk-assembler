import Vue from 'vue';
import Element from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// import JkAssembler, { permission } from '../../packages/index';
// import permission from '../../packages/permission/index';

// 使用异步函数也是可以的
export default ({
  Vue, // VuePress 正在使用的 Vue 构造函数
  options, // 附加到根实例的一些选项
  router, // 当前应用的路由实例
  isServer
}) => {
  // ...做一些其他的应用级别的优化
  Vue.use(Element);
  if (!isServer) {
    import('../../packages/permission/index').then(permission => {
      Vue.use(permission);
    });
  }
  // Vue.mixin({
  //   async mounted() {
  //     await this.$nextTick();
  //     import('../../packages/permission/permission').then(permission => {
  //       Vue.directive('permission', permission);
  //     });
  //   }
  // });
};
