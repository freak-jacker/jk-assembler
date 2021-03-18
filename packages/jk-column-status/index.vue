<template>
  <div>
    <el-popconfirm @confirm="onConfirm" title="确认要进行此操作？">
      <div slot="reference">
        <el-switch
          :value="value"
          v-bind="props"
          :active-value="activeValue"
          :inactive-value="inactiveValue"
          :disabled="disabled"
          @change="changeSwitch"
        />
      </div>
    </el-popconfirm>
  </div>
</template>

<script>
export default {
  name: 'JkColumnStatus',
  model: {
    prop: 'value',
    event: 'update'
  },
  props: {
    value: {
      type: [Boolean, String, Number],
      default: false
    },
    activeValue: {
      type: [Boolean, String, Number],
      default: true
    },
    inactiveValue: {
      type: [Boolean, String, Number],
      default: false
    },
    disabled: {
      type: [Boolean],
      default: false
    },
    props: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      middleValue: this.data
    };
  },

  methods: {
    onConfirm() {
      this.$emit('change', this.middleValue);
    },
    async changeSwitch(val) {
      this.middleValue = val;
    }
  }
};
</script>
