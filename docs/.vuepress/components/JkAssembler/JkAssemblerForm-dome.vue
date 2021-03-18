<template>
  <div class="container">
    <JkAssemblerForm
      v-model="formModel"
      v-bind="form"
      :permission="['admin', 'edit']"
      @submit="onSubmit"
      @cancel="onCancel"
    />
  </div>
</template>

<script>
import JkAssemblerForm from '../../../../packages/jk-assembler/form/index';

export default {
  components: { JkAssemblerForm },
  data() {
    return {
      formModel: {},
      form: {
        //表单属性配置
        props: {},
        //表单方法
        events: {},
        // 表单项配置
        columns: [
          {
            prop: 'name',
            label: '名称',
            rules: [{ required: true, message: '必填项' }], //校验规则
            tip: '提示文本提示文本提示文本提示文本提示文本提示示文本', //提示文本
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
            //提示也可以使用jsx语法
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
        //表单按钮操作项
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
            }
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
    onSubmit() {},
    onCancel() {}
  }
};
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
