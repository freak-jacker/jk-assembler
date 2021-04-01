import './styles/index.scss';

// 集成注册器
import JkAssembler from './jk-assembler';
import JkAssemblerFilter from './jk-assembler/filter';
import JkAssemblerTable from './jk-assembler/table';
import JkAssemblerForm from './jk-assembler/form';
import JkAssemblerFormPanel from './jk-assembler/form-panel/index';
import JkAssemblerPagination from './jk-assembler/pagination';

// 全局组件
import JkColumnImages from './jk-column-images';
import JkColumnStatus from './jk-column-status';
import JkColumnSort from './jk-column-sort';
import JkFormSelect from './jk-form-select';
import JkFormCheckbox from './jk-form-checkbox';
import JkFormCheckboxObj from './jk-form-checkbox-obj';
import JkFormRadio from './jk-form-radio';
import JkFormUploadImage from './jk-form-upload';
import JkFormUploadImageList from './jk-form-upload/list';
import JkFormUploadVideo from './jk-form-upload/video';
import JkTinymce from './jk-tinymce';

// 其他组件
import JkBannerCard from './jk-banner/index';
import JkBannerCardList from './jk-banner/list';

// 全局指令
import permission from './permission';
import { comparePermission } from './permission/permission';

const components = [
  // 集成注册器
  JkAssembler,
  JkAssemblerFilter,
  JkAssemblerTable,
  JkAssemblerForm,
  JkAssemblerFormPanel,
  JkAssemblerPagination,

  // 全局组件
  JkColumnImages,
  JkColumnStatus,
  JkColumnSort,
  JkFormSelect,
  JkFormCheckbox,
  JkFormCheckboxObj,
  JkFormRadio,
  JkFormUploadImage,
  JkFormUploadImageList,
  JkFormUploadVideo,

  // 其他组件
  JkBannerCard,
  JkBannerCardList,
  JkTinymce
];

const install = function(Vue, opt = {}) {
  components.map(component => {
    Vue.component(component.name, component);
  });
};

/* 支持使用标签的方式引入 */
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

export { permission, comparePermission };
export {
  JkAssembler,
  JkAssemblerFilter,
  JkAssemblerTable,
  JkAssemblerForm,
  JkAssemblerFormPanel,
  JkAssemblerPagination,
  JkColumnImages,
  JkColumnStatus,
  JkColumnSort,
  JkFormSelect,
  JkFormCheckbox,
  JkFormUploadImage,
  JkFormUploadImageList,
  JkFormUploadVideo,
  JkBannerCard,
  JkBannerCardList,
  JkTinymce
};
export default {
  install,
  JkAssembler,
  JkAssemblerFilter,
  JkAssemblerTable,
  JkAssemblerForm,
  JkAssemblerFormPanel,
  JkAssemblerPagination,

  JkColumnImages,
  JkColumnStatus,
  JkColumnSort,
  JkFormSelect,
  JkFormCheckbox,
  JkFormUploadImage,
  JkFormUploadImageList,
  JkFormUploadVideo,
  JkBannerCard,
  JkBannerCardList,
  JkTinymce
};
