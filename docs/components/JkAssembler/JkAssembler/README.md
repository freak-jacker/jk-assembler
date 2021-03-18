---
title: README
date: 2020-12-08 14:45:58

categories:
  - JkAssembler
  - JkAssembler
tags:
  -
---

### JkAssembler

### 基本用法

集成组件 JkAssembler 的基本用法。

<el-card>

<ClientOnly>
  <JkAssembler-jk-assembler-dome/>
</ClientOnly>

<details>

<summary> 代码详情 </summary>

::: v-pre

```vue
<template>
  <div class="container">
    <JkAssembler :config="config" />
  </div>
</template>

<script>
import JkAssembler from 'jk-assembler';

export default {
  components: { JkAssembler },
  data() {
    return {
      config: baseConfig.bind(this)
    };
  },
  computed: {},
  created() {},
  methods: {}
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
          console.log(data);
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
        props: {
          width: '80%'
        }
      },
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

<style lang="scss" scoped></style>
```

:::

</details>

  </el-card>

### <p>属性值</p>

| 属性名称   | 属性描述           | 类型     | 默认值 |
| :--------- | :----------------- | :------- | :----- |
| config     | 集成注册器的设置项 | Function | ()=>{} |
| padding    | 是否设置内边距     | Boolean  | true   |
| pagination | 是否展示分页器组件 | Boolean  | true   |

### <p>config 属性</p>

| 属性名称 | 属性描述                 | 类型   | 默认值           | 配置详情                                                                      |
| :------- | :----------------------- | :----- | :--------------- | :---------------------------------------------------------------------------- |
| search   | 检索方法和自定义检索条件 | Object | {default,handle} | **default** 配置搜索默认过滤字段和数据排序依据及方式；**handle** 配置检索方法 |
| filter   | 检索配置                 | Object | {}               | [查看](/components/JkAssembler/JkAssemblerFilter)                             |
| table    | 表格配置                 | Object | {}               | [查看](/components/JkAssembler/JkAssemblerTable)                              |
| form     | 表单配置                 | Object | {}               | [查看](/components/JkAssembler/JkAssemblerFormPanel)                          |
