---
title: JkAssemblerPagination
date: 2020-12-08 14:45:58

categories: 
  - JkAssembler
  - JkAssemblerPagination
tags: 
  - 
---

### JkAssemblerPagination

### 基本用法

集成组件 JkAssemblerPagination 的基本用法。

<ClientOnly>
  <el-card>
<JkAssembler-JkAssemblerPagination-dome/>

<details>

<summary> 代码详情 </summary>

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
import JkPagination from 'jk-assembler';

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

</details>

  </el-card>
</ClientOnly>

### <p>属性值</p>

| 属性名称      | 属性描述                                                 | 类型    | 默认值            |
| :------------ | :------------------------------------------------------- | :------ | :---------------- |
| value/v-model | 分页属性                                                 | Object  | {}                |
| total         | 总页数                                                   | Number  | 0                 |
| sizes         | 每页显示个数                                             | Array   | [10, 20, 50, 100] |
| hideSingle    | 单页是否显示 pagination(**true 为不显示，false 为显示**) | Boolean | true              |

### <p>事件</p>

| 事件名称 | 事件描述                                                  | 回调参数 |
| :------- | :-------------------------------------------------------- | :------- |
| Change   | 监听 change 事件，page 变化返回 false，size 变化返回 true | Boolean  |
