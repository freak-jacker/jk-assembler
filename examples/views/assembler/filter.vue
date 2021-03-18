<template>
  <div>
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
import JkAssemblerFilter from '../../../packages/jk-assembler/filter/index';
const render1 = h => <div>222</div>;
export default {
  components: { JkAssemblerFilter },
  data() {
    return {
      query: {},
      filter: {
        props: {},
        events: {},
        columns: [
          {
            prop: 'name',
            label: '名称',
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
            // render: (h, { value, record, rows, index }) => {},
            // default: ''
          },
          {
            prop: 'mobile',
            label: '电话',
            render: (h, { value, record, rows, index }) => {
              if (record.name) return <div>{record.name}</div>;
              else return <el-tag>空的</el-tag>;
            }
          },
          {
            prop: 'other',
            label: '其他',
            default: '沙子',
            hidden: true
          }
        ],
        operation: {
          search: {
            label: '搜索111',
            props: {
              plain: true,
              type: 'info'
            }
            // handle: () => {
            //   console.log(1);
            // }
          },
          add: {
            label: '新增',
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
  },
  computed: {},
  created() {},
  methods: {
    search() {
      console.log('search');
    },
    add() {}
  }
};
</script>

<style lang="scss" scoped></style>
