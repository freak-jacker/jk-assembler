export default {
  upload: () => {
    return {
      code: 200,
      message: '操作成功',
      data: [
        {
          url:
            'https://vikebaby-test-file.oss-cn-shanghai.aliyuncs.com/20200522/jpg/f0b48510-b8a0-4ba6-bcdd-d2ff4a8a47c5.jpg',
          fileName: 'f0b48510-b8a0-4ba6-bcdd-d2ff4a8a47c5.jpg',
          originalFilename: '5.jpg',
          extension: 'jpg'
        }
      ]
    };
  }
};
