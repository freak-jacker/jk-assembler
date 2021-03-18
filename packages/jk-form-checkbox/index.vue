<template>
  <el-checkbox-group v-model="checkedList" @change="handleCheckedChange">
    <el-checkbox
      v-for="(item, index) in list"
      :label="item[optionValue]"
      :key="index"
      >{{ item[optionLabel] }}</el-checkbox
    >
  </el-checkbox-group>
</template>

<script>
export default {
  name: 'JkFormCheckbox',
  model: {
    prop: 'value',
    event: 'update'
  },
  props: {
    value: {
      type: [Array, String],
      default: () => []
    },
    option: {
      type: [Function, Array, Promise],
      default: () => []
    },
    optionValue: [String, Object],
    optionLabel: [String]
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
  data() {
    return {
      list: [],
      checkedList: this.filter(this.value)
    };
  },
  methods: {
    filter(val) {
      const ids = [];
      if (!this.isArray(val)) {
        return [];
      } else {
        val.map(item => {
          ids.push(item.id);
        });
        this.$emit('update', ids);
        return ids;
      }
    },
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
