<template>
  <el-select
    :value="value"
    :placeholder="placeholder"
    clearable
    :disabled="disabled"
    @change="changeModal"
  >
    <el-option
      v-for="item in list"
      :key="'option-' + item[optionValue]"
      :label="item[optionLabel]"
      :value="item[optionValue]"
    ></el-option>
  </el-select>
</template>

<script>
export default {
  name: 'JkFormSelect',
  model: {
    prop: 'value',
    event: 'update'
  },
  props: {
    value: {
      type: [String, Number]
    },
    option: {
      type: [Function, Array, Promise],
      default: () => []
    },
    optionValue: [String, Number, Object],
    optionLabel: [String],
    optionDefaultItem: [String, Object], // 添加默认选项，如全部
    disabled: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: '请选择'
    }
  },
  watch: {
    option: {
      handler: function(val, oldVal) {
        // console.log('option change', val, oldVal)
        this.getList();
      },
      deep: true
    }
  },
  created() {
    this.getList();
  },
  data() {
    return {
      list: []
    };
  },
  methods: {
    changeModal(val) {
      this.$emit('update', val);
      this.$emit('change', val);
    },

    async getList() {
      if (this.isPromise(this.option)) {
        this.option.then(res => {
          this.list = [...res];
          if (this.optionDefaultItem) {
            this.list.unshift(this.optionDefaultItem);
          }
        });
      } else {
        if (this.isFun(this.option)) {
          const data = await this.option();
          this.list = data;
        } else if (this.isArray(this.option)) {
          this.list = this.option;
        }
        if (this.optionDefaultItem) {
          this.list.unshift(Object.assign({}, this.optionDefaultItem));
        }
      }
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
