---
title: JkAssemblerForm
date: 2020-12-08 14:45:58

categories: 
  - JkAssembler
  - JkAssemblerForm
tags: 
  - 
---

### JkAssemblerForm

### 基本用法

集成组件 JkAssemblerForm 的基本用法。

<ClientOnly>
  <el-card>
<JkAssembler-JkAssemblerForm-dome/>

<details>

<summary> 代码详情 </summary>

```vue
<template>
  <JkAssemblerFrom
    v-model="formModel"
    v-bind="form"
    :permission="['admin', 'edit']"
    @submit="onSubmit"
    @cancel="onCancel"
  />
</template>

<script>
import JkAssemblerFrom from 'jk-assembler';

export default {
  components: { JkAssemblerFrom },
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
```

</details>

  </el-card>
</ClientOnly>

> form 表单配置项中的，函数有 value，record 俩个参数，value 是当前配置项的值，record 是 form 表单绑定的值。

**注意：** 只有定义了操作项中 submit 项和 cancel 项，才会显示对应的按钮。如果这俩项配置下面没有对应的 handle 方法配置，则会调用对应的监听方法。否则 handle 优先。

### <p>属性值</p>

| 属性名称   | 属性描述             | 类型   | 默认值 |
| :--------- | :------------------- | :----- | :----- |
| props      | 表单绑定属性值       | Object | {}     |
| events     | 表单绑定事件         | Object | {}     |
| operation  | 表单按钮组           | Object | {}     |
| columns    | 表单项               | Array  | []     |
| permission | 可操作表单的权限数组 | Array  | []     |
