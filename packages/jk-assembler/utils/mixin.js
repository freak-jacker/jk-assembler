// permission directives
import permission from '../../permission';
import { get } from 'lodash-es';

export const permissionMixin = {
  directives: { permission },
  props: {
    /**
     * 用户拥有的权限
     */
    PermissionRole: {
      type: [Boolean, Array],
      default: false
    }
  },
  created: function() {
    // 把用户权限存储在全局变量中
    if (this.PermissionRole && !window.PermissionRole) {
      window.PermissionRole = this.PermissionRole;
    }
  },
  methods: {}
};

export const methodsMixin = {
  methods: {
    lodashGet: get,
    warnMessage(message = '缺少需要执行的方法') {
      console.warn(message);
    }
  }
};
