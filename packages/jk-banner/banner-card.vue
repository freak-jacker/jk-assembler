<template>
  <el-card shadow="hover" class="banner-card-container">
    <div class="image" slot="header">
      <el-image
        class="inner-img"
        fit="contain"
        :src="image"
        :preview-src-list="[image]"
      ></el-image>
    </div>
    <div class="tools">
      <el-button type="primary" plain class="tools-item" @click="$emit('edit')">
        编辑
      </el-button>
      <el-button type="danger" plain class="tools-item" @click="$emit('del')">
        删除
      </el-button>
      <el-button-group v-if="sort" class="tools-item">
        <el-button
          class="sort-btn"
          icon="el-icon-back"
          size="mini"
          circle
          plain
          @click="$emit('up')"
        />
        <el-button
          class="sort-btn"
          icon="el-icon-right"
          size="mini"
          circle
          plain
          @click="$emit('down')"
        />
      </el-button-group>
    </div>
  </el-card>
</template>

<script>
export default {
  name: 'JkBannerCard',
  props: {
    image: {
      type: String,
      default: ''
    },
    sort: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    sortModel: {
      get() {
        return this.sort;
      },
      set(val) {
        console.log('val: ', val);
      }
    }
  },
  data() {
    return {};
  },
  mounted() {},
  methods: {}
};
</script>

<style lang="scss" scoped>
.banner-card-container {
  width: 280px;
  margin-right: 10px;
  margin-bottom: 10px;
  .image {
    height: 140px;
    background: #f1f1f1;
    .inner-img {
      width: 100%;
      height: 100%;
    }
  }
  .tools {
    display: flex;
    .tools-item {
      margin-left: 10px;
      &:first-child {
        margin-left: 0;
      }
    }
  }
}
</style>
