<template>
  <div class="container">
    <JkAssembler :config="config" />
  </div>
</template>

<script>
import JkAssembler from '../../../../packages/jk-assembler/index';

export default {
  components: { JkAssembler },
  data() {
    return {
      config: baseConfig.bind(this)
    };
  },
  computed: {},
  created() {},
  methods: {},
  mounted() {
    console.log(this);
  }
};

function baseConfig(Vue) {
  return {
    search: {
      default: {
        name: '1',
        sort: 'name,desc'
      },
      handle: async query => {
        return new Promise(resolve => {
          const data = [];
          for (let i = 0; i < 10; i++) {
            data.push({
              id: i,
              name: '名称' + i,
              title: '标题',
              mobile: i * 1000 * 23 - 188 * i * 26,
              status: i % 3 === 0
            });
          }
          resolve({
            data: data,
            pagination: {
              total: 100
            }
          });
        });
      }
    },
    filter: {
      columns: [
        {
          prop: 'name',
          label: '名称',
          component: {
            is: 'el-input',
            props: {
              width: 200,
              placeholder: '请输入'
            }
          }
        }
      ],
      operation: {
        search: {},
        add: {}
      }
    },
    table: {
      data: [],
      props: {},
      events: {
        'sort-change': ({ column, prop, order }) => {
          if (order === 'ascending') {
            order = 'asc';
          } else if (order === 'descending') {
            order = 'desc';
          }
          const orderObj = { sort: null };
          if (order) {
            orderObj.sort = `${prop},${order}`;
          }
          Vue._setQuery(orderObj);
        }
      },
      columns: [
        {
          type: 'index'
        },
        { type: 'selection' },
        // 展示为一个可展开的按钮，展开内容为prop绑定的值
        { type: 'expand', prop: 'title' },
        {
          prop: 'name',
          label: '名称',
          sortable: 'custom'
        },
        {
          prop: 'mobile',
          label: '电话',
          render: (h, { value }) => <el-tag>{value}</el-tag>
        },
        {
          prop: 'status',
          label: '电话',
          width: 100,
          permission: ['admin'],
          component: {
            is: 'el-switch',
            events: record => {
              return {
                change() {
                  console.log('record: ', record);
                }
              };
            }
          }
        }
      ],
      operationList: [
        {
          key: 'key',
          props: {
            width: 200,
            label: '操作2'
          },
          butns: [
            { label: '自定义1', props: {}, handle: () => {} },
            { label: '自定义2', props: {}, handle: () => {} }
          ]
        }
      ],
      operation: {
        props: {
          width: 260
        },
        edit: {
          permission: ['admin'],
          label: '编辑',
          props: {}
        },
        del: {
          permission: ['admin'],
          props: {},
          handle: ({ record }) => {
            console.log('record: ', record);
          }
        },
        butns: [{ label: '自定义', props: {}, handle: () => {} }]
      }
    },
    form: {
      panel: {
        props: {}
      },
      default: {},
      props: {},
      events: {},
      columns: [
        {
          prop: 'name',
          label: '名称',
          rules: [{ required: true, message: '必填项' }],
          tip: '提示文本提示文本提示文本提示文本提示文本提示示文本',
          component: {
            is: 'el-input',
            props: {
              width: 200,
              placeholder: '请输入'
            },
            events: ({ value, record }) => {
              return {
                change: val => {
                  console.log('change: ', val);
                }
              };
            }
          }
        },
        {
          prop: 'mobile',
          label: '电话',
          rules: [{ required: true, message: '必填项' }],
          tip: h => <el-tag>111</el-tag>,
          component: {
            is: 'el-input',
            props: {
              width: 200,
              placeholder: '请输入'
            },
            events: ({ value, record }) => {
              return {
                change: val => {
                  console.log('change: ', val);
                }
              };
            }
          }
        }
      ],
      operation: {
        submit: {
          props: {},
          handle: async () => {
            console.log('submit');
            await this.$sleep();
            this.$message.success('操作成功');
          }
        },
        cancel: {
          props: {
            plain: true
          },
          handle: () => {}
        },

        butns: [
          {
            label: '其他按钮',
            props: {},
            handle: () => {
              console.log('qqita');
            }
          }
        ]
      }
    }
  };
}
</script>

<style lang="scss" scoped>
.container ::v-deep {
  .el-card {
    margin: 12px 0;
  }
  .el-form {
    font-size: 12px;
  }
  .el-button {
    font-size: 12px;
    border-radius: 3px;
  }
  .el-button {
    padding: 7px 15px;
  }
  .el-input--suffix .el-input__inner {
    padding-right: 30px;
  }
  .el-input__inner {
    height: 28px;
    line-height: 28px;
  }
  .el-table td,
  .el-table th {
    padding: 6px 0;
  }
  .el-table {
    font-size: 12px;
  }
  .el-table__body,
  .el-table__footer,
  .el-table__header {
    table-layout: fixed;
    border-collapse: separate;
  }
  .el-table__expanded-cell[class*='cell'] {
    padding: 20px 50px;
  }
}
</style>
