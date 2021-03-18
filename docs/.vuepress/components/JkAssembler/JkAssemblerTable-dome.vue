<template>
  <div class="container">
    <JkAssemblerTable v-bind="table" />
  </div>
</template>
<script>
import JkAssemblerTable from '../../../../packages/jk-assembler/table/index';

export default {
  components: { JkAssemblerTable },
  data() {
    return {
      table: {
        data: [], //绑定的数据
        props: {}, //表格中可以bind的所有值
        //表格中可以bind的所有Table Events
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
            this._setQuery(orderObj);
          }
        },
        // 表格列表项声明
        columns: [
          {
            type: 'index' //显示序号
          },
          { type: 'selection' }, //显示多选框
          // 展示为一个可展开的按钮，展开内容为prop绑定的值
          { type: 'expand', prop: 'title' },
          // 普通的 table-item
          {
            prop: 'name', //对应列内容的字段名
            label: '名称' //显示的标题
          },
          // 开启sortable, 需配合events使用
          {
            prop: 'title',
            label: '直播标题',
            sortable: 'custom'
          },
          {
            prop: 'mobile',
            label: '电话',
            //可以用jsx语法来展现表格中的内容
            render: (h, { value }) => <el-tag>{value}</el-tag>
          },
          {
            prop: 'status',
            label: '电话',
            width: 100,
            permission: ['admin'], //权限控制
            component: {
              //引入组件
              is: 'el-switch',
              //组件属性
              props: {},
              //一个参数，是当前行的数据
              events: record => {
                return {
                  //当前组件的事件
                  change() {
                    console.log('record: ', record);
                  }
                };
              }
            }
          }
        ],
        operationList: [
          //表格操作项
          {
            key: 'key',
            props: {
              //操作项的属性配置，默认属性设置为label: '其他操作项',align: 'center'
              width: 200,
              label: '操作2'
            },
            butns: [
              //当前项内多按钮的配置
              {
                label: '自定义1', //按钮的显示文本
                props: {}, //按钮的属性配置
                //按钮的单击回调函数，一个参数包含当前行数据scope.row,当前行索引scope.$index,table的全部数据data
                handle: record => {
                  console.log(record);
                }
              },
              { label: '自定义2', props: {}, handle: () => {} }
            ]
          },
          {
            props: {
              width: 200
            },
            butns: [
              {
                label: '自定义1',
                props: {},
                handle: record => {
                  console.log(record);
                }
              },
              { label: '自定义2', props: {}, handle: () => {} }
            ]
          }
        ],
        //表格操作项默认有俩个按钮，编辑和删除按钮
        operation: {
          props: {
            //当前操作项的属性配置
            width: 260
          },
          edit: {
            //默认编辑按钮配置
            permission: ['admin'],
            label: '编辑',
            props: {},
            handle: ({ record }) => {
              console.log('record: ', record);
            }
          },
          del: {
            //默认删除按钮配置
            permission: ['admin'],
            props: {},
            handle: ({ record }) => {
              console.log('record: ', record);
            }
          },
          //自定义按钮配置
          butns: [{ label: '自定义', props: {}, handle: () => {} }]
        }
      }
    };
  },
  created() {
    // window.PermissionRole = [];
    console.log('2');
    this.getData();
  },
  methods: {
    getData() {
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
      console.log('data: ', data);
      this.table.data = data;
    }
  }
};
</script>

<style lang="scss" scoped>
.container ::v-deep {
  margin: 12px 0;
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
