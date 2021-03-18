<template>
  <div class="page">
    <div class="images__list">
      <div class="images__list">
        <div class="item" v-for="(item, index) in imageList" :key="item.uid">
          <el-image
            class="image"
            :src="item.url"
            fit="contain"
            :preview-src-list="[item.url]"
          ></el-image>
          <div class="close__butn" @click="deletImageIndex(index)">
            <i class="el-icon-delete"></i>
          </div>
        </div>
      </div>

      <el-upload
        v-if="imageList.length < limit"
        multiple
        action=""
        accept=".jpeg, .gif, .png"
        :http-request="request"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
      >
        <div class="item border">
          <i class="el-icon-plus" />
        </div>
      </el-upload>
    </div>
  </div>
</template>

<script>
export default {
  name: 'JkFormUploadImageList',
  model: {
    prop: 'images',
    event: 'update'
  },
  props: {
    images: {
      type: [Array, String],
      default: () => []
    },
    limit: {
      type: Number,
      default: 6
    },
    request: {
      type: Function,
      default: () => {}
    }
  },
  computed: {
    imageList: {
      get() {
        if (this.images && this.images instanceof Array) return this.images;
        else {
          return [];
        }
      },
      set(val) {
        console.log(val);
        this.$emit('update', val);
      }
    }
  },
  data() {
    return {};
  },
  methods: {
    handleAvatarSuccess(response, file) {
      const limit = this.limit;
      const imageListLen = this.imageList.length;
      if (imageListLen >= limit) {
        this.$message.warning(`当前限制选择 ${limit} 个文件`);
        return;
      } else {
        file.url = response;

        const imageList = [...this.imageList, file];
        this.progress = 0;
        this.$emit('update', imageList);
        this.$emit('success', imageList);
      }
    },
    handleExceed(files, fileList) {},
    deletImageIndex(index) {
      this.imageList.splice(index, 1)[0];
    },

    isObj(o) {
      return Object.prototype.toString.call(o) === '[object Object]';
    }
  }
};
</script>

<style lang="scss" scoped>
.images__list {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  .item {
    margin-right: 20px;
    margin-bottom: 20px;
    width: 120px;
    height: 120px;
    background: #f2f2f2;
    position: relative;
    &.border {
      background: #ffffff;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      border: 1px dashed #d9d9d9 !important;
      display: flex;
      justify-content: center;
      align-items: center;
      .el-icon-plus {
        font-size: 20px;
        color: #d9d9d9;
      }
      &:hover {
        border-color: #409eff;
      }
    }
    .image {
      width: 100%;
      height: 100%;
    }
    .close__butn {
      position: absolute;
      right: -15px;
      top: -15px;
      width: 30px;
      height: 30px;
      border-radius: 50%;
      background: #ccc;
      border: 2px solid #ffffff;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}
</style>
