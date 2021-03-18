import { addClass } from './utils';

export function comparePermission(value) {
  const Roles = window.PermissionRole;
  if (value && value instanceof Array && value.length > 0 && Roles) {
    const permissionRoles = value;
    const hasPermission = Roles.some(role => {
      return permissionRoles.includes(role);
    });
    return !hasPermission;
  }
  return false;
}

export default {
  inserted(el, binding, vnode) {
    const Roles = window.PermissionRole;
    const { value } = binding;

    if (value && value instanceof Array && value.length > 0 && Roles) {
      const permissionRoles = value;

      const hasPermission = Roles.some(role => {
        return permissionRoles.includes(role);
      });

      if (!hasPermission) {
        if (binding.modifiers.del) {
          // 删除模式 v-permission.del
          el.parentNode && el.parentNode.removeChild(el);
          return;
        } else {
          // 显示无权限
          el.disabled = 'disabled';
          addClass(el, 'is-disabled');
          addClass(el, 'is-permission');
          // set childrens el disabled
          const childrenEl = [
            ...el.getElementsByTagName('input'),
            ...el.getElementsByTagName('button')
          ];
          childrenEl.forEach(el_i => {
            el_i.disabled = 'disabled';
            addClass(el_i, 'is-disabled');
          });
          // el.parentNode && el.parentNode.removeChild(el)
        }
      }
    } else {
      // throw new Error(`need roles! Like v-permission="['admin','editor']"`)
    }
  }
};
