<template>
  <div class="container">
    <JkAssemblerFilter
      v-model="query"
      v-bind="filter"
      @search="search"
      @add="add"
    />

    <el-card>
      {{ query }}
    </el-card>
  </div>
</template>

<script>
import JkAssemblerFilter from '../../../../packages/jk-assembler/filter/index';

export default {
  components: { JkAssemblerFilter },
  data() {
    return {
      query: {},
      filter: {
        //filter表单属性配置,以下为示例
        props: {
          labelWidth: '120px', //表单域标签的宽度
          size: 'small', //表单内组件的尺寸
          disabled: false //是否禁用该表单内的所有组件
        },
        //filter表单方法
        events: {},
        //filter检索条件配置
        columns: [
          {
            prop: 'name', //检索条件字段
            label: '名称', //显示的标题
            //可引入相应的组件完成需求
            component: {
              is: 'el-input', //组件
              //组件属性配置
              props: {
                width: 200,
                placeholder: '请输入'
              },
              //组件方法
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
            //也可用jsx语法完成需求
            render: (h, { value, record, rows, index }) => {
              if (record.name) return <div>{record.name}</div>;
              else return <el-tag>空的</el-tag>;
            }
          },
          {
            prop: 'other',
            label: '其他',
            default: '沙子',
            hidden: true //是否隐藏此检索条件，当为true时不显示
          }
        ],
        //filter表单按钮配置项
        //filter内置了俩个默认的按钮add和search，有对应的默认配置
        //可以在fiter组件上监听add和search事件
        //当add和search在配置项有对应的handle方法的时候，handle方法优先
        operation: {
          add: {}, //有默认配置
          search: {
            label: '搜索111',
            //按钮的配置属性
            props: {
              plain: true,
              type: 'info'
            },
            //按钮对应的方法，可不写
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
  },
  methods: {
    add() {},
    search() {}
  }
};
</script>

<style lang="scss" scoped>
.container {
  margin: 12px 0;
}
</style>
