---
title: JkAssemblerTable
date: 2020-12-08 14:45:58

categories: 
  - JkAssembler
  - JkAssemblerTable
tags: 
  - 
---

### JkAssemblerTable

### 基本用法

集成组件 JkAssemblerTable 的基本用法。

<ClientOnly>
  <el-card>
<JkAssembler-JkAssemblerTable-dome/>

<details>

<summary> 代码详情 </summary>

```vue
<template>
  <JkAssemblerTable v-bind="table" />
</template>

<script>
import JkAssemblerTable from 'jk-assembler';

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
```

</details>

  </el-card>
</ClientOnly>

> 在**JkAssemblerTable**中，除去操作项按钮组的列表项中函数的默认参数只有 record 一个，record 包含这一行的详细数据。
>
> 而操作项按钮组和表格操作项的按钮的默认参数有 record,index,rows 三个。record 本行数据，index 本行索引，rows 表格绑定数据。

**注意：** 在集成组件 JkAssembler 中，table 中的 edit 按钮在 **_没有 handle 方法_** 的情况下，会调起组件 JkAssembler 中 form 的配置项弹窗。如果有 edit 有 handle 方法，handle 优先。

### <p>属性值</p>

| 属性名称      | 属性描述                            | 类型   | 默认值 |
| :------------ | :---------------------------------- | :----- | :----- |
| data          | 绑定的数据                          | Array  | []     |
| props         | 表格中可以 bind 的所有值            | Object | {}     |
| events        | 表格中可以 bind 的所有 Table Events | Object | {}     |
| columns       | 表格列表项声明                      | Array  | []     |
| operation     | 表格默认操作项 -- 按钮组            | Object | {}     |
| operationList | 表格按钮组                          | Array  | []     |
