<template>
  <div class="assembler-form-panel">
    <el-dialog
      :visible.sync="dialogVisible"
      :title="dialigTitle"
      @close="handleClose"
      v-bind="Object.assign({}, props)"
      v-on="Object.assign({}, events)"
    >
      <JkForm
        ref="form"
        v-model="formModel"
        v-bind="config"
        @cancel="handleCancel"
        @submit="handleSubmit"
      />
    </el-dialog>
  </div>
</template>

<script>
import { get } from 'lodash-es';
import JkForm from '../form';
export default {
  name: 'JkAssemblerFormPanel',
  components: { JkForm },
  model: {
    prop: 'value',
    event: 'update'
  },
  props: {
    visible: { type: Boolean, default: false },
    title: { type: String, default: '' },
    props: { type: Object, default: () => {} },
    events: { type: Object, default: () => {} },

    value: { type: Object, default: () => {} },
    // default: { type: Object, default: () => {} },
    config: { type: Object, default: () => {} }
  },
  data() {
    return {};
  },
  computed: {
    formModel: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit('update', val);
      }
    },
    dialogVisible: {
      get() {
        return this.visible;
      },
      set(val) {
        this.$emit('update:visible', val);
      }
    },
    dialigTitle() {
      const titleText = this.title ? `${this.title} - ` : '';
      if (get(this.formModel, 'id')) {
        return titleText + `编辑`;
      }
      return titleText + `新增`;
    }
  },
  created() {},
  methods: {
    handleClose() {
      this.$refs.form.reset();
    },
    handleCancel() {
      this.dialogVisible = false;
    },
    handleSubmit() {
      this.dialogVisible = false;
    }
  }
};
</script>

<style lang="scss" scoped></style>
