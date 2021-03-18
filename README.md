# jk-assembler 2.0

> 基于配置快速实现管理系统中搜索、表格、表单、分页功能。
> 基于vue2版本的 `element-ui` 库进行的二次封装的动态组件

## 快速使用

- 全局引用注册

```js
import JKAssembler from 'jk-assembler';
Vue.use(JKAssembler);
```

- 按需引用

```js
 # developing
```

## 集成组件

| 组件名称              | 组件描述                    | 组件使用方式                   |
| --------------------- | --------------------------- | ------------------------------ |
| JkAssembler           | 集成表单                    | [查看](#jkassembler)           |
| JkAssemblerFilter     | 集成表单-搜索组件           | [查看](#jkassemblerfilter)     |
| JkAssemblerTable      | 集成表单-表格组件           | [查看](#jkassemblertable)      |
| JkAssemblerForm       | 集成表单-表单组件           | [查看](#jkassemblerform)       |
| JkAssemblerFormPanel  | 集成表单-表单组件(弹窗模式) | [查看](#jkassemblerformpanel)  |
| JkAssemblerPagination | 集成表单-分页组件           | [查看](#jkassemblerpagination) |
| JkBannerCard          | banner 组件                 | [查看](#jkbannercard)          |
| JkBannerCardList      | banner 列表组件             | [查看](#JkBannerCardList)      |

### JkAssembler

#### 属性值

| 属性名称   | 属性描述           | 类型     | 默认值 |
| ---------- | ------------------ | -------- | ------ |
| config     | 集成注册器的设置项 | Function | ()=>{} |
| padding    | 是否设置内边距     | Boolean  | true   |
| pagination | 是否展示分页器组件 | Boolean  | true   |

#### config 属性

| 属性名称 | 属性描述                 | 类型   | 默认值 | 配置详情          |
| -------- | ------------------------ | ------ | ------ | ----------------- |
| search   | 检索方法和自定义检索条件 | Object | {}     | [查看](#属性值)   |
| filter   | 检索配置                 | Object | {}     | [查看](#属性值-1) |
| table    | 表格配置                 | Object | {}     | [查看](#属性值-2) |
| form     | 表单配置                 | Object | {}     | [查看](#属性值-3) |

> 示例

```vue
<template>
  <jk-assembler :config="config" />
</template>
<script>
export default {
  data() {
    return {
      config: baseConfig.bind(this)
    };
  }
};
</script>
```

> 配置属性

```js
function baseConfig(Vue) {
    config: {
        //配置检索方法和自定义检索条件
        search: {
          //自定义检索条件
          default: {
            name: '王',
            sort: 'id,desc'
          },
          //检索方法
          handel: (queryParams = {}) => {
            return TableApi.getList(queryParams);
          }
        },
        filter: {
          props: {},
          events: {},
          columns: [],
          operation: {}
        },
        table: {
          data: [],
          props: {},
          events: {},
          columns: [],
          operation: {},
          operationList: []
        },
        form: {
          props: {},
          events: {},
          columns: [],
          operation: {}
        }
      }
}
```

### JkAssemblerFilter

#### 属性值

| 属性名称  | 属性描述            | 类型   | 默认值 |
| --------- | ------------------- | ------ | ------ |
| props     | Filter 表单属性配置 | Object | {}     |
| events    | Filter 表单方法     | Object | {}     |
| operation | Filter 按钮配置     | Object | {}     |
| columns   | Filter 检索条件     | Array  | []     |

> 示例

```vue
<template>
  <JkAssemblerFilter
    v-model="query"
    v-bind="filter"
    @search="search"
    @add="add"
  />
</template>

<script>
export default {
  data() {
    return {
      query: {},
	  filter: {
          //filter表单属性配置,以下为示例
          props: {
            labelWidth: '230px', //表单域标签的宽度
            size: 'small', //表单内组件的尺寸
            disabled: true //是否禁用该表单内的所有组件
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
            add: {},//有默认配置
            search: {
              label: '搜索111',
              //按钮的配置属性
              props: {
                plain: true,
                type: 'info'
              }
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
  methods:{
    add(){};
    search(){}
  }
};
</script>
```

> **JkAssemblerFilter**中检索条件配置的 jsx 和 events 参数有俩个，一个 value 是当前对应项的值，另一个 record 是当前 filter 表单的绑定值。按钮操作组没有默认参数。

**注意：**在集成组件 JkAssembler 中，filter 中的 add 按钮在**_没有 handle 方法_**的情况下，会调起组件 JkAssembler 中 form 的配置项弹窗。如果有 add 有 handle 方法，handle 优先。

### JkAssemblerTable

#### 属性值

| 属性名称      | 属性描述                            | 类型   | 默认值 |
| ------------- | ----------------------------------- | ------ | ------ |
| data          | 绑定的数据                          | Array  | []     |
| props         | 表格中可以 bind 的所有值            | Object | {}     |
| events        | 表格中可以 bind 的所有 Table Events | Object | {}     |
| columns       | 表格列表项声明                      | Array  | []     |
| operation     | 表格默认操作项 -- 按钮组            | Object | {}     |
| operationList | 表格按钮组                          | Array  | []     |

> 示例

```vue
<template>
  <JkAssemblerTable v-bind="table" />
</template>
<script>
export default {
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
  }
};
</script>
```

> 在**JkAssemblerTable**中，除去操作项按钮组的列表项中函数的默认参数只有 record 一个，record 包含这一行的详细数据。
>
> 而操作项按钮组和表格操作项的按钮的默认参数有 record,index,rows 三个。record 本行数据，index 本行索引，rows 表格绑定数据。

**注意：**在集成组件 JkAssembler 中，table 中的 edit 按钮在**_没有 handle 方法_**的情况下，会调起组件 JkAssembler 中 form 的配置项弹窗。如果有 edit 有 handle 方法，handle 优先。

### JkAssemblerForm

#### 属性值

| 属性名称   | 属性描述             | 类型   | 默认值 |
| ---------- | -------------------- | ------ | ------ |
| props      | 表单绑定属性值       | Object | {}     |
| events     | 表单绑定事件         | Object | {}     |
| operation  | 表单按钮组           | Object | {}     |
| columns    | 表单项               | Array  | []     |
| permission | 可操作表单的权限数组 | Array  | []     |

> 示例

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
export default {
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
    }
  }
</script>
```

> form 表单配置项中的，函数有 value，record 俩个参数，value 是当前配置项的值，record 是 form 表单绑定的值。

**注意：**只有定义了操作项中 submit 项和 cancel 项，才会显示对应的按钮。如果这俩项配置下面没有对应的 handle 方法配置，则会调用对应的监听方法。否则 handle 优先。

### JkAssemblerFormPanel

#### 属性值

| 属性名称 | 属性描述       | 类型   | 默认值 |
| -------- | -------------- | ------ | ------ |
| title    | 弹窗标题       | String | ''     |
| props    | 弹窗绑定属性值 | Object | {}     |
| events   | 弹窗绑定事件   | Object | {}     |
| config   | 表单绑定属性   | Object | {}     |

> 示例

```vue
<template>
  <JkAssemblerFormPanel
    v-model="formModel"
    :visible.sync="visible"
    :title="title"
    :props="props"
    :event="event"
    :config="config"
  />
</template>
<script>
export default {
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

### JkAssemblerPagination

#### 属性值

| 属性名称      | 属性描述                | 类型    | 默认值            |
| ------------- | ----------------------- | ------- | ----------------- |
| value/v-model | 分页属性                | Object  | {}                |
| total         | 总页数                  | Number  | 0                 |
| sizes         | 每页显示个数            | Array   | [10, 20, 50, 100] |
| hideSingle    | 单页是否显示 pagination | Boolean | true              |

#### 事件

| 事件名称 | 事件描述                                                  | 回调参数 |
| -------- | --------------------------------------------------------- | -------- |
| Change   | 监听 change 事件，page 变化返回 false，size 变化返回 true | Boolean  |

> 示例

```vue
<template>
  <JkPagination
    v-model="option"
    :total="100"
    :hideSingle="false"
    :sizes="[20, 30, 50, 100]"
    @change="changePage"
  />
</template>
<script>
export default {
  components: { JkPagination },
  data() {
    return {
      //pagination配置项
      //默认单页不显示分页
      //监听change事件，page变化返回false，size变化返回true
      option: {
        page: 1,
        size: 10
      }
    };
  },
  computed: {},
  created() {},
  methods: {
    changePage(val) {
      console.log('changePage: ', val);
    }
  }
};
</script>
```

### JkBannerCard

#### 属性值

| 属性名称 | 属性描述         | 类型    | 默认值 |
| -------- | ---------------- | ------- | ------ |
| image    | 图片链接地址     | String  | ''     |
| sort     | 是否显示排序按钮 | Boolean | false  |

#### 事件

| 事件名称 | 事件描述         | 回调参数 |
| -------- | ---------------- | -------- |
| edit     | 点击编辑按钮触发 | 无       |
| del      | 点击删除按钮触发 | 无       |
| up       | 点击向前按钮触发 | 无       |
| down     | 点击向后按钮触发 | 无       |

> 示例

```vue
<template>
  <jk-banner-card
    :image="image"
    @edit="edithandle"
    @del="delhandle"
    @up="uphandle"
    @down="downhandle"
    sort
  />
</template>
<script>
export default {
  data() {
    return {
      image: ''
    };
  },
  methods: {
    edithandle() {
      console.log('edit');
    },
    delhandle() {
      console.log('del');
    },
    uphandle() {
      console.log('up');
    },
    downhandle() {
      console.log('down');
    }
  }
};
</script>
```

### JkBannerCardList

#### 属性值

| 属性名称      | 属性描述                   | 类型    | 默认值 |
| ------------- | -------------------------- | ------- | ------ |
| value/v-model | 图片链接地址数组           | Array   | []     |
| title         | 当前 banner 标题           | String  | ''     |
| sort          | 是否显示排序按钮           | Boolean | false  |
| limit         | banner 的个数              | Number  | 5      |
| formConfig    | 新增或编辑 banner 表单配置 | Object  | {}     |
| events        | banner 按钮相应事件声明    | Object  | {}     |

#### 事件

| 事件名称 | 事件描述         | 回调参数                                                                                     |
| -------- | ---------------- | -------------------------------------------------------------------------------------------- |
| del      | 点击删除按钮触发 | row(当前 banner 详细信息)                                                                    |
| up       | 点击向前按钮触发 | 一个参数包含{row(当前 banner 详细信息), index(当前 banner 索引), rows(本 banner 列表绑定值)} |
| down     | 点击向后按钮触发 | 一个参数包含{row(当前 banner 详细信息), index(当前 banner 索引), rows(本 banner 列表绑定值)} |

> 示例

```vue
<template>
  <jk-banner-card-list
    v-model="images"
    title="标题"
    :formConfig="config"
    limit="2"
    :events="events"
    @del="delhandle"
    @up="uphandle"
    @down="downhandle"
    sort
  ></jk-banner-card-list>
</template>
<script>
export default {
  data() {
    return {
      images: [
        {
          id: '111',
          url: 'https://www.sncstemcell.com/img/inside-home.2dd47b57.png'
        },
        {
          id: '112',
          url: 'https://www.sncstemcell.com/img/inside-home.2dd47b57.png'
        }
      ],
      events: {
        del: row => {
          console.log(row);
        }
      },
      config: {
        props: {},
        events: {},
        columns: [
          {
            prop: 'url',
            label: '图片地址',
            component: {
              is: 'el-input'
            }
          }
        ]
      }
    };
  },
  methods: {
    delhandle() {
      console.log('2');
    },
    uphandle() {
      console.log('3');
    },
    downhandle() {
      console.log('4');
    }
  }
};
</script>
```

**注意：**配置项 events 中定义的方法优先于事件监听的生效。
