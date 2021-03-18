<template>
  <!-- 单张图片上传 -->
  <div>
    <el-upload
      action=""
      name="files"
      accept=".mp4, .mp3"
      :http-request="uploadRequest"
      :show-file-list="false"
      :before-upload="beforeFileUpload"
      :on-success="successFileUpload"
      :on-error="handleUploadError"
    >
      <el-button size="small" type="primary">{{ butnText }}</el-button>
    </el-upload>
    <video
      v-if="video"
      :src="video"
      class="video__priview"
      controls="controls"
      @durationchange="getDuration"
    ></video>
    <el-progress v-if="progress" :percentage="progress"></el-progress>
  </div>
</template>

<script>
export default {
  name: 'JkFormUploadVideo',
  model: {
    prop: 'video',
    event: 'update'
  },
  props: {
    butnText: {
      type: String,
      default: '上传'
    },
    video: {
      type: String,
      default: ''
    },
    times: {
      type: [String, Number],
      default: ''
    },
    request: {
      type: Function,
      default: function() {}
    }
  },
  data() {
    return {
      progress: 0,
      uploadRequest: this.request.bind(this)
    };
  },
  methods: {
    getDuration() {
      const t2 = parseInt(document.getElementsByTagName('video')[0].duration);
      this.$emit('update:times', t2);
    },
    beforeFileUpload(file) {
      this.$emit('update', '');
      this.$emit('update:times', '');
    },
    successFileUpload(url, file, fileList) {
      this.progress = 0;
      this.$emit('update', url);
      this.$emit('success', url);
    },
    updateProgress(process) {
      this.progress = process;
    },
    handleUploadError() {
      this.progress = 0;
      this.$message.error('上传文件失败');
    }
  }
};
</script>

<style lang="scss" scoped>
.video__priview {
  width: 300px;
  height: 200px;
  object-fit: cover;
  margin-top: 20px;
}
</style>
