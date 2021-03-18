<template>
  <div>
    <JkAssemblerFrom
      v-model="formModel"
      v-bind="filter"
      @search="search"
      @add="add"
    />

    <el-card>
      {{ formModel }}
    </el-card>
  </div>
</template>

<script>
import JkAssemblerFrom from '../../../packages/jk-assembler/form/index';
const render1 = h => <div>222</div>;
export default {
  components: { JkAssemblerFrom },
  data() {
    return {
      formModel: {},
      filter: {
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
          },
          {
            prop: 'hhh',
            label: '电话111',
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
          submit: {
            props: {},
            handle: () => {
              console.log('submit');
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
