<template>
  <div class="assembler-form">
    <el-form
      :model="formModel"
      v-bind="Object.assign({ labelWidth: '120px' }, props)"
      v-on="events"
      ref="form"
      v-loading="loading"
      v-permission="permission"
    >
      <el-form-item
        v-for="column in columns"
        :key="`prop_${column.prop}`"
        v-bind="column"
      >
        <template v-if="column.component">
          <!-- 组件模式 -->
          <component
            :is="column.component.is"
            v-model="formModel[column.prop]"
            v-bind="column.component.props"
            clearable
            v-on="
              lodashGet(column, 'component.events', () => ({}))({
                value: formModel[column.prop],
                record: formModel
              })
            "
          />
        </template>
        <!-- 自定义render -->
        <template v-else-if="column.render">
          <Dito
            :render="column.render"
            :scope="{
              value: formModel[column.prop],
              record: formModel
            }"
          />
        </template>

        <div v-if="column.tip" class="form-item-tip">
          <template v-if="isFunction(column.tip)">
            <Dito
              :render="column.tip"
              :scope="{
                value: formModel[column.prop],
                record: formModel
              }"
            />
          </template>
          <template v-else>
            {{ column.tip }}
          </template>
        </div>
      </el-form-item>

      <el-form-item v-if="operation">
        <template v-if="operation.submit">
          <el-button
            v-permission="operation.submit.permission"
            v-bind="Object.assign({ type: 'primary' }, operation.submit.props)"
            @click="handleSubmit(operation.submit.handle)"
          >
            {{ operation.submit.label || '提交' }}
          </el-button>
        </template>
        <template v-if="operation.cancel">
          <el-button
            v-bind="
              operation.cancel.props || {
                type: 'primary',
                plain: true
              }
            "
            @click="handleCancel(operation.cancel.handle)"
          >
            {{ operation.cancel.label || '取消' }}
          </el-button>
        </template>
        <template v-if="operation.butns">
          <template v-for="(butn, index) in operation.butns">
            <el-button
              :key="`butn_` + index"
              v-bind="butn.props"
              @click="butn.handle && butn.handle()"
            >
              {{ butn.label }}
            </el-button>
          </template>
        </template>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import Dito from '../utils/Dito';
import { isFunction } from '../utils';
import { cloneDeep } from 'lodash-es';
import { permissionMixin, methodsMixin } from '../utils/mixin';

export default {
  model: {
    prop: 'value',
    event: 'update'
  },
  name: 'JkAssemblerForm',
  mixins: [permissionMixin, methodsMixin],
  components: { Dito },
  props: {
    value: { type: Object, default: () => {} }, // 绑定外部formModel
    props: { type: Object, default: () => {} }, // formProps
    events: { type: Object, default: () => {} }, // 表单formEvents
    operation: { type: Object, default: () => {} }, // 按钮
    columns: { type: Array, default: () => [] }, // 表单formItems
    permission: { type: Array, default: () => [] } // 表单formItems
  },
  data() {
    return {
      loading: false
    };
  },
  computed: {
    formModel: {
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
    isFunction,
    reset() {
      this.$refs.form.resetFields();
      this.formModel = {};
    },
    async handleSubmit(cb) {
      console.log('cb: ', typeof cb);
      try {
        this.loading = true;
        await this.$refs.form.validate();
        console.log('pass validate');
        const obj = cloneDeep(this.formModel);
        if (cb) await cb({ record: obj });
        this.$emit('submit');
      } catch (err) {
        return false;
      } finally {
        this.loading = false;
      }
    },
    async handleCancel(cb) {
      if (cb) await cb();
      this.$emit('cancel');
    }
  }
};
</script>

<style lang="scss" scoped>
.form-item-tip {
  color: #999999;
  font-size: 12px;
  line-height: 1.4;
  margin-top: 5px;
}
</style>
