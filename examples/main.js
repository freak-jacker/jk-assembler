import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

Vue.config.productionTip = false;

import './styles/index.scss';

// element
import 'element-ui/lib/theme-chalk/index.css';
import ElementUI from 'element-ui';

Vue.use(ElementUI, {
  size: 'mini'
});

import JkAssembler, { permission } from '../packages/index';
Vue.use(JkAssembler);
Vue.use(permission);

Vue.prototype.$sleep = (t = 1000) => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, t);
  });
};

const isProd = process.env.NODE_ENV === 'production';
if (!isProd) {
  require('../mock');
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
