---
title: JkAssemblerFormPanel
date: 2020-12-08 14:45:58

categories: 
  - JkAssembler
  - JkAssemblerFormPanel
tags: 
  - 
---

### JkAssemblerFormPanel

### 基本用法

集成组件 JkAssemblerFormPanel 的基本用法。

<ClientOnly>
  <el-card>
<JkAssembler-JkAssemblerFormPanel-dome/>

<details>

<summary> 代码详情 </summary>

```vue
<template>
  <div>
    <JkAssemblerFormPanel
      v-model="formModel"
      :visible.sync="visible"
      :title="title"
      :props="props"
      :event="event"
      :config="config"
    />
    <el-card>
      <el-button @click="() => {visible = true;}">新增</el-button>
      <el-button
        @click="() => {
          visible = true;
          formModel = {
            id: '2',
            name: '测试1',
            mobile: '12222'
          };
        }">
        编辑
      </el-button>
      {{ formModel }}
    </el-card>
  </div>
</template>

<script>
import JkAssemblerFormPanel from 'jk-assembler';

export default {
  components: { JkAssemblerFormPanel },
  data() {
    return {
      visible: false,
      formModel: {}, // 表单绑定值
      title: '你好的', //弹窗标题
      props: {}, // 弹窗绑定属性值
      event: {}, // 弹窗绑定事件
      // 表单项配置
      config: {
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
  }
};
</script>
```

</details>

  </el-card>
</ClientOnly>

### <p>属性值</p>

| 属性名称 | 属性描述       | 类型   | 默认值 |
| :------- | :------------- | :----- | :----- |
| title    | 弹窗标题       | String | ''     |
| props    | 弹窗绑定属性值 | Object | {}     |
| events   | 弹窗绑定事件   | Object | {}     |
| config   | 表单绑定属性   | Object | {}     |
