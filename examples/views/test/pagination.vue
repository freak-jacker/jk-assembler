<template>
  <div>
    <JkPagination v-model="option" :total="100" @change="changePage" />

    <el-card>{{ option }}</el-card>
  </div>
</template>

<script>
import JkPagination from '../../../packages/jk-assembler/pagination';
export default {
  components: { JkPagination },
  data() {
    return {
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

<style lang="scss" scoped></style>
