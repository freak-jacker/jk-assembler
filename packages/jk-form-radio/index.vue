<template>
  <el-radio-group v-model="checkedValue" @change="handleCheckedChange">
    <el-radio
      v-for="(item, index) in list"
      :label="item[optionValue]"
      :key="index"
      >{{ item[optionLabel] }}</el-radio
    >
  </el-radio-group>
</template>

<script>
export default {
  name: 'JkFormRadio',
  model: {
    prop: 'value',
    event: 'update'
  },
  props: {
    value: {
      type: [Number, String],
      default: ''
    },
    option: {
      type: [Function, Array, Promise],
      default: () => []
    },
    optionValue: [String, Object],
    optionLabel: [String]
  },
  data() {
    return {
      list: []
    };
  },
  computed: {
    checkedValue: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit('update', val);
      }
    }
  },
  async created() {
    if (this.isPromise(this.option)) {
      this.option.then(res => {
        this.list = res;
      });
    } else if (this.isFun(this.option)) {
      const data = await this.option();
      this.list = data;
    } else if (this.isArray(this.option)) {
      this.list = this.option;
    } else {
      this.list = [];
    }
  },
  methods: {
    handleCheckedChange(val) {
      this.$emit('update', val);
      this.$emit('change', val);
    },
    isArray(val) {
      return val && val instanceof Array;
    },
    isFun(val) {
      return val && val instanceof Function;
    },
    isPromise(val) {
      return val && val instanceof Promise;
    }
  }
};
</script>

<style></style>
