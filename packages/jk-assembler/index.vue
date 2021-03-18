<template>
  <div class="assembler-container" :class="padding ? 'pd20' : ''">
    <JkFilter
      v-if="instance.filter"
      v-model="filterQeury"
      v-bind="instance.filter"
      @search="_refresh"
      @add="handleAdd"
    />

    <JkTable
      v-if="instance.table"
      v-bind="instance.table"
      v-loading="isLoading"
      @edit="handleTableEdit"
      @del="handleTableDel"
    />

    <JkPagination
      v-if="pagination"
      v-model="pageOptions"
      :total="pageTotal"
      @change="handleSearch"
    />

    <JkFormPanel
      v-if="instance.form"
      v-model="formModel"
      :visible.sync="formVisible"
      :config="instance.form"
      :title="lodashGet(instance, 'form.panel.title')"
      :props="lodashGet(instance, 'form.panel.props')"
      :events="lodashGet(instance, 'form.panel.events')"
    />
  </div>
</template>

<script>
import JkFilter from './filter';
import JkTable from './table';
import JkFormPanel from './form-panel';
import JkPagination from './pagination';
import { permissionMixin, methodsMixin } from './utils/mixin';
import { get, cloneDeep, isFunction } from 'lodash-es';
export default {
  name: 'JkAssembler',
  mixins: [permissionMixin, methodsMixin],
  components: { JkFilter, JkTable, JkFormPanel, JkPagination },
  props: {
    config: {
      require: true,
      type: [Function, Object],
      default: () => ({})
    },
    padding: {
      type: Boolean,
      default: true
    },
    pagination: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      isLoading: false,
      filterQeury: {},
      pageTotal: 0,
      pageOptions: {
        page: 1,
        size: 10
      },
      formModel: {},
      formVisible: false
    };
  },
  computed: {
    instance() {
      if (isFunction(this.config)) {
        return this.config(this);
      }
      return this.config;
    }
  },
  created() {
    this.handleSearch();
  },
  methods: {
    async handleSearch(refresh) {
      try {
        this.isLoading = true;
        const pageOptions = this.pageOptions;
        const filterDefault = get(this.instance, 'search.default', {});
        const filterQeury = this.filterQeury;
        const ApiQuery = {
          ...pageOptions,
          ...filterDefault,
          ...filterQeury
        };

        const __searchList = get(this.instance, 'search.handle');
        if (__searchList) {
          const result = await __searchList(ApiQuery);
          this.pageTotal = get(result, 'pagination.total');
          this.instance.table.data = get(result, 'data');
        } else {
          console.warn('没有 config.search.handle 方法，请自行添加');
        }
      } catch (err) {
        console.error(err);
        this.$message.error('拉取数据错误');
      } finally {
        this.isLoading = false;
      }
    },
    handleAdd() {
      this.formVisible = true;
    },
    handleTableEdit({ record }) {
      this.formModel = cloneDeep(record);
      this.formVisible = true;
    },
    handleTableDel() {},

    _refresh(refresh = false) {
      this.pageOptions.page = 1;
      this.handleSearch(refresh);
    },
    _setQuery(record) {
      Object.entries(record).forEach(([k, v]) => {
        this.$set(this.filterQeury, k, v);
      });
      this.handleSearch();
    }
  }
};
</script>

<style lang="scss" scoped>
.pd20 {
  padding: 20px;
}
</style>
