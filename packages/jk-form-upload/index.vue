<template>
  <!-- 单张图片上传 -->
  <div>
    <div class="avatar-uploader--container">
      <el-progress
        v-if="progress > 0"
        class="progress"
        type="circle"
        :percentage="progress"
      ></el-progress>
      <el-upload
        v-else
        action=""
        accept=".jpeg, .gif, .png, .jpg"
        list-type="picture-card"
        :http-request="uploadRequest"
        :drag="true"
        :show-file-list="false"
        :before-upload="beforeUpload"
        :on-success="uploadSuccess"
        :on-error="handleUploadError"
        class="avatar-uploader"
      >
        <el-image class="inner-image" fit="contain" v-if="image" :src="image" />
        <i v-else class="el-icon-plus" />
      </el-upload>

      <el-popover v-if="image" placement="right" trigger="hover">
        <div class="preview_view">
          <img :src="image" />
        </div>
        <div slot="reference" class="preview">预览</div>
      </el-popover>
    </div>

    <div class="tips" v-if="tips" v-html="tips"></div>
  </div>
</template>

<script>
export default {
  name: 'JkFormUploadImage',
  model: {
    prop: 'image',
    event: 'update'
  },
  props: {
    image: {
      type: String,
      default: ''
    },
    request: {
      type: Function,
      default: function() {}
    },
    tips: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      progress: 0,
      uploadRequest: this.request.bind(this)
    };
  },
  methods: {
    beforeUpload(file) {
      this.$emit('update', '');

      const isJPG = file.type.indexOf('image') !== -1;
      const isLt2M = file.size / 1024 / 1024 < 10;
      if (!isJPG) {
        this.$message.error('上传图片只能是 图片 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 10MB!');
      }
      return isJPG && isLt2M;
    },

    uploadSuccess(url, file, fileList) {
      this.progress = 0;
      this.$emit('update', url);
      this.$emit('success', url);
    },
    handleUploadError() {
      this.$notify({
        title: '失败',
        type: 'error',
        message: '图片上传失败',
        duration: 2000
      });
    },
    updateProgress(process) {
      this.progress = process;
    }
  }
};
</script>

<style lang="scss" scoped>
.preview_view {
  width: 300px;
  max-height: 400px;
  overflow-y: auto;
  img {
    width: 100%;
    height: auto;
  }
}
.avatar-uploader--container {
  position: relative;
  width: 148px !important;
  height: 148px;
  display: inline-block;
  .preview {
    width: 40px;
    height: 40px;
    position: absolute;
    top: 0;
    right: 0;
    background: rgba($color: #000000, $alpha: 0.4);
    transform-origin: 'background';
    transition-duration: 0.4s;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 2;
    font-size: 12px;
    border-bottom-left-radius: 10px;
    &:hover {
      background: #409eff;
    }
  }
  ::v-deep {
    .avatar-uploader {
      .el-upload {
        border: 1px dashed #d9d9d9 !important;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
        &:hover {
          border-color: #409eff;
        }
      }
      .progress {
        z-index: 2;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
      .inner-image {
        width: 100%;
        height: 100%;
        background: #f1f1f1;
      }
    }
    .el-upload-dragger {
      width: 100%;
      height: 100%;
    }
  }
}
.tips {
  color: #999999;
  font-size: 12px;
  margin-top: 6px;
}
</style>
