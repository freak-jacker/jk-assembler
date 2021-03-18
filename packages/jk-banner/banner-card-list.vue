<template>
  <el-card>
    <div class="title" slot="header">{{ title }}</div>
    <div class="row">
      <div v-for="(item, index) in bannerList" :key="item.id">
        <BannerCard
          :image="item.url"
          :sort="sort"
          @edit="handleEdit(item)"
          @del="handleDel(item)"
          @up="handleUp(item, index, bannerList)"
          @down="handleDown(item, index, bannerList)"
        />
      </div>
      <el-button
        v-if="bannerList.length < limit"
        class="item-add"
        icon="el-icon-plus"
        @click="handleAdd"
      >
      </el-button>
    </div>

    <JkAssemblerFormPanel
      v-model="formModel"
      :visible.sync="visible"
      :config="config"
    ></JkAssemblerFormPanel>
  </el-card>
</template>

<script>
import BannerCard from './banner-card';
import JkAssemblerFormPanel from '../jk-assembler/form-panel/index.vue';
import { isFunction } from 'lodash-es';
export default {
  name: 'JkBannerCardList',
  components: { BannerCard, JkAssemblerFormPanel },
  props: {
    value: {
      type: Array,
      default: () => []
    },
    title: {
      type: String,
      default: ''
    },
    sort: {
      type: Boolean,
      default: false
    },
    limit: {
      type: [Number, String],
      default: 5
    },
    formConfig: {
      type: [Function, Object],
      default: () => {}
    },
    events: {
      type: [Object],
      default: () => {}
    }
  },
  computed: {
    config() {
      if (isFunction(this.formConfig)) {
        return this.formConfig(this);
      }
      return this.formConfig;
    },
    bannerList: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit('update', val);
      }
    }
  },
  data() {
    return {
      visible: false,
      formModel: {}
    };
  },
  created() {},
  methods: {
    handleAdd() {
      this.visible = true;
      this.formModel = {};
    },
    handleEdit(item) {
      this.visible = true;
      this.formModel = Object.assign({}, item);
    },
    handleDel(row) {
      if (this.events.del) {
        this.events.del(row);
      } else {
        this.$emit('del', { row });
      }
    },
    handleUp(row, index, rows) {
      if (this.events.up) {
        this.events.up(row, index, rows);
      } else {
        this.$emit('up', { row, index, rows });
      }
    },
    handleDown(row, index, rows) {
      if (this.events.down) {
        this.events.down(row, index, rows);
      } else {
        this.$emit('down', { row, index, rows });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.row {
  display: flex;
  flex-wrap: wrap;
}
.title {
  font-size: 20px;
}
.item-add {
  width: 120px;
  height: 246px;
  background-color: #f1f1f1;
  font-size: 40px;
  line-height: 1;
  display: block;
  margin-right: 10px;
  margin-bottom: 10px;
}
</style>
