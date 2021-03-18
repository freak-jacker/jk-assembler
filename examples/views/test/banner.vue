<template>
  <div>
    <jk-banner-card :image="image" sort></jk-banner-card>

    <jk-banner-card-list
      v-model="images"
      title="标题"
      :formConfig="config"
    ></jk-banner-card-list>
  </div>
</template>

<script>
export default {
  data() {
    return {
      image: '',
      images: [
        {
          id: '111',
          url: 'https://www.sncstemcell.com/img/inside-home.2dd47b57.png'
        }
      ],
      config: {
        props: {},
        events: {},
        columns: [
          {
            prop: 'url',
            label: '图片地址',
            component: {
              is: 'el-input'
            }
          }
        ]
      }
    };
  },
  computed: {},
  created() {},
  methods: {}
};
</script>

<style lang="scss" scoped></style>
