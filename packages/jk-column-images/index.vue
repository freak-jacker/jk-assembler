<template>
  <!-- 示例代码 -->
  <div class="table-column-images">
    <template v-for="(url, index) in list">
      <el-image
        class="table-column-images__item"
        fit="contain"
        :key="index"
        :src="url"
        :preview-src-list="list"
      />
    </template>
  </div>
</template>

<script>
import { isArray } from 'lodash-es';
export default {
  name: 'JkColumnImages',
  props: {
    value: {
      type: [String, Array],
      required: true,
      default: () => []
    },
    srcKey: {
      type: [String]
    }
  },
  computed: {
    list() {
      if (isArray(this.value)) {
        if (!this.srcKey) {
          return this.value;
        } else {
          return this.value.map(item => {
            return item[this.srcKey];
          });
        }
      } else {
        return [this.value];
      }
    }
  }
};
</script>

<style lang="scss">
.table-column-images {
  display: flex;
  &__item {
    width: 100%;
    height: 70px;
    padding: 5px;
    object-fit: cover;
  }
}
</style>
