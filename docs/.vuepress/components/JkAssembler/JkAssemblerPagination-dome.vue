<template>
  <JkAssemblerPagination
    v-model="option"
    :total="100"
    :hideSingle="false"
    :sizes="[20, 30, 50, 100]"
    @change="changePage"
  />
</template>
<script>
import JkAssemblerPagination from '../../../../packages/jk-assembler/pagination';
export default {
  components: { JkAssemblerPagination },
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
