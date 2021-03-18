<template>
  <div class="pagination-panel">
    <!-- 分页面板附加操作 -->
    <div class="panel-additional">
      <slot />
    </div>
    <!-- 分页器 -->
    <template v-if="total && total !== 0">
      <el-pagination
        :current-page="pageOptions.page"
        :page-size="pageOptions.size"
        :page-sizes="sizes"
        :layout="layout"
        :total="total"
        :hide-on-single-page="hideSingle"
        background
        class="pagination"
        @size-change="onSizeChange"
        @current-change="onPageChange"
      />
    </template>
  </div>
</template>

<script>
export default {
  name: 'JkAssemblerPagination',
  model: {
    prop: 'value',
    event: 'update'
  },
  props: {
    value: {
      required: true,
      type: Object
    },
    total: {
      type: Number,
      default: 0
    },
    sizes: {
      type: Array,
      default: () => [10, 20, 50, 100]
    },
    // 隐藏单页
    hideSingle: {
      type: Boolean,
      default: true
    }
  },

  data() {
    return {};
  },

  computed: {
    pageOptions: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit('update', val);
      }
    },
    layout() {
      return `total, sizes, prev, pager, next, jumper`;
    }
  },

  methods: {
    onSizeChange(size) {
      this.pageOptions = {
        size: size,
        page: 1
      };
      this.$emit('change', true);
    },
    onPageChange(page) {
      this.pageOptions = {
        size: this.pageOptions.size,
        page: page
      };
      this.$emit('change', false);
    }
  }
};
</script>

<style lang="scss" scoped>
.pagination-panel {
  margin: 20px;
  display: flex;
  justify-content: space-between;
}
</style>
