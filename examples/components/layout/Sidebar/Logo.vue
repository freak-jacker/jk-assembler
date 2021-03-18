<template>
  <div class="slide-item">
    <el-button @click="toEntry" class="slide-butn">
      <i class="el-icon-s-home"></i>
      <span v-if="!collapse">总台</span>
    </el-button>
  </div>
</template>

<script>
export default {
  name: 'SidebarLogo',
  props: {
    collapse: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {};
  },
  methods: {
    toEntry() {}
  }
};
</script>

<style lang="scss" scoped>
.slide-item {
  position: relative;
  width: 100%;
  height: 60px;
  line-height: 60px;
  background: #2b2f3a;
  text-align: center;
  overflow: hidden;
  color: #ffffff;
  font-size: 16px;
  .slide-butn {
    width: 80%;
  }
  span {
    margin-left: 10px;
  }
}
</style>
