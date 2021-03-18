---
title: JkAssemblerFilter
date: 2020-12-08 14:45:58

categories:
  - JkAssembler
  - JkAssemblerFilter
tags:
  -
---

### JkAssemblerFilter

### 基本用法

集成组件 JkAssemblerFilter 的基本用法。

  <el-card>
<ClientOnly>
  <JkAssembler-JkAssemblerFilter-dome/>
</ClientOnly>
<details>

<summary> 代码详情 </summary>

```vue
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
import JkAssemblerFilter from 'jk-assembler';

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
```

</details>

  </el-card>

> **JkAssemblerFilter**中检索条件配置的 jsx 和 events 参数有俩个，一个 value 是当前对应项的值，另一个 record 是当前 filter 表单的绑定值。按钮操作组没有默认参数。

**注意：** 在集成组件 JkAssembler 中，filter 中的 add 按钮在 **_没有 handle 方法_** 的情况下，会调起组件 JkAssembler 中 form 的配置项弹窗。如果有 add 有 handle 方法，handle 优先。

#### <p>属性值</p>

| 属性名称  | 属性描述            | 类型   | 默认值 |
| :-------- | :------------------ | :----- | :----- |
| props     | Filter 表单属性配置 | Object | {}     |
| events    | Filter 表单方法     | Object | {}     |
| operation | Filter 按钮配置     | Object | {}     |
| columns   | Filter 检索条件     | Array  | []     |

#### <p>columns 中每一个配置对象的属性</p>

| 属性名称  | 属性描述                               | 类型     | 默认值 |
| :-------- | :------------------------------------- | :------- | :----- |
| label     | 检索条件标签                           | String   | ''     |
| props     | 检索条件字段                           | String   | ''     |
| hidden    | 是否隐藏此检索条件，当为 true 时不显示 | Boolean  | false  |
| component | 可配置的动态组件                       | Object   | {}     |
| render    | JSX 渲染函数方法                       | Function | ()=>{} |

##### <p>动态组件 component 的属性配置</p>

| 属性名称 | 属性描述     | 类型     | 默认值 |
| :------- | :----------- | :------- | :----- |
| is       | 配置组件     | String   | ''     |
| props    | 组件属性配置 | String   | {}     |
| events   | 组件方法     | Function | ()=>{} |

#### <p>operation 配置属性</p>

| 属性名称 | 属性描述     | 类型     | 默认值 |
| :------- | :----------- | :------- | :----- |
| is       | 配置组件     | String   | ''     |
| props    | 组件属性配置 | String   | {}     |
| events   | 组件方法     | Function | ()=>{} |
