<template>
  <div class="assembler-filter">
    <el-form inline v-bind="props" v-on="events">
      <el-form-item
        v-for="column in columns"
        :key="`${column.prop}`"
        :label="column.label"
        v-show="!column.hidden"
      >
        <template v-if="column.component">
          <!-- 组件模式 -->
          <component
            :is="column.component.is"
            v-model="filterQuery[column.prop]"
            v-bind="column.component.props"
            clearable
            v-on="
              column.component.events
                ? column.component.events({
                    value: filterQuery[column.prop],
                    record: filterQuery
                  })
                : {}
            "
            @change="handleSearch"
          />
        </template>
        <!-- 自定义render -->
        <template v-else-if="column.render">
          <Dito
            :render="column.render"
            :scope="{
              value: filterQuery[column.prop],
              record: filterQuery
            }"
          />
        </template>
      </el-form-item>
      <!-- 按钮 -->

      <template v-if="operation">
        <el-form-item v-if="operation.search">
          <el-button
            v-bind="Object.assign({ type: 'primary' }, operation.search.props)"
            @click="lodashGet(operation, 'search.handle', handleSearch)()"
          >
            {{ operation.search.label || '搜索' }}
          </el-button>
        </el-form-item>
        <el-form-item v-if="operation.add">
          <el-button
            v-permission="operation.add.permission"
            v-bind="
              lodashGet(operation, 'add.props', {
                type: 'primary',
                plain: true,
                icon: 'el-icon-plus'
              })
            "
            @click="
              operation.add.handle ? operation.add.handle() : $emit('add')
            "
          >
            {{ operation.add.label || '新增' }}
          </el-button>
        </el-form-item>
        <template v-if="operation.butns">
          <el-form-item
            v-for="(butn, index) in operation.butns"
            :key="`butn_` + index"
          >
            <el-button
              v-bind="butn.props"
              v-permission="butn.permission"
              @click="
                butn.handle
                  ? butn.handle()
                  : warnMessage('请添加按钮handle方法')
              "
            >
              {{ butn.label }}
            </el-button>
          </el-form-item>
        </template>
      </template>
    </el-form>
  </div>
</template>

<script>
import Dito from '../utils/Dito';
import { permissionMixin, methodsMixin } from '../utils/mixin';
export default {
  model: {
    prop: 'value',
    event: 'update'
  },
  name: 'JkAssemblerFilter',
  mixins: [permissionMixin, methodsMixin],
  components: { Dito },
  props: {
    value: { type: Object, default: () => {} }, // querys
    props: { type: Object, default: () => {} }, // formProps
    events: { type: Object, default: () => {} }, // 表单formEvents
    operation: { type: Object, default: () => {} }, // 表单按钮
    columns: { type: Array, default: () => [] } // 表单formItems
  },
  data() {
    return {};
  },
  computed: {
    filterQuery: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit('update', val);
      }
    }
  },
  created() {},
  methods: {
    // 触发更新查询
    handleSearch() {
      this.$emit('search', true);
    }
  }
};
</script>

<style lang="scss" scoped></style>
