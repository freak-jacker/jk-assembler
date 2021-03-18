const Mock = require('mockjs'); // mockjs 导入依赖模块
const Random = Mock.Random;
const code = 200;

export default {
  List: config => {
    console.log('config: ', config);

    const result = Mock.mock({
      'data|10': [
        {
          'id|+1': 1,
          'status|1': ['ONLINE', 'OFFLINE'],
          name: Random.csentence(16),
          startTime: Random.datetime(),
          image: Random.image()
        }
      ]
    });
    return { code, data: result.data, pagination: { total: 100 } };
  }
};
