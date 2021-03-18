const Mock = require('mockjs'); // mockjs 导入依赖模块
// const Random = Mock.Random

Mock.setup({
  timeout: 400
});

const modulesFiles = require.context('./modules', true, /\.js$/);
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1');
  const value = modulesFiles(modulePath);
  modules[moduleName] = value.default;
  return modules;
}, {});

Mock.mock(/\/api\/table\/.*/, 'all', modules.table1.List);

Mock.mock('/api/files', 'post', modules.file.upload);

export default Mock;
