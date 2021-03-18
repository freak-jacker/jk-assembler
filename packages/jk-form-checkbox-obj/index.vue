<template>
  <el-checkbox-group v-model="checkedList">
    <el-checkbox
      v-for="(item, index) in list"
      :label="oValue(item)"
      :key="index"
      >{{ item[optionLabel] }}</el-checkbox
    >
  </el-checkbox-group>
</template>

<script>
export default {
  name: 'JkFormCheckboxObj',
  model: {
    prop: 'value',
    event: 'update'
  },
  props: {
    value: {
      type: [Array],
      default: () => []
    },
    option: {
      type: [Function, Array, Promise],
      default: () => []
    },
    optionValue: [String],
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
  computed: {
    checkedList: {
      get() {
        console.log('this.value: ', this.value);
        return this.value.reduce((acc, it) => {
          return acc.concat(JSON.stringify(it));
        }, []);
      },
      set(val) {
        const result = val.map(it => {
          return JSON.parse(it);
        });
        console.log('result: ', result);
        this.$emit('update', result);
      }
    }
  },
  data() {
    return {
      list: []
    };
  },
  methods: {
    oValue(item) {
      return JSON.stringify(item);
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
