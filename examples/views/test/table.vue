<template>
  <div>
    <JkTable v-bind="table" />
  </div>
</template>

<script>
import JkTable from '../../../packages/jk-assembler/table';
export default {
  components: { JkTable },
  data() {
    return {
      table: {
        data: [],
        props: {},
        events: {},
        columns: [
          {
            type: 'index'
          },
          { type: 'selection' },
          // 展示为一个可展开的按钮，展开内容为prop绑定的值
          { type: 'expand', prop: 'title' },
          {
            prop: 'name',
            label: '名称'
          },
          {
            prop: 'mobile',
            label: '电话',
            render: (h, { value }) => <el-tag>{value}</el-tag>
          },
          {
            prop: 'status',
            label: '电话',
            width: 100,
            permission: ['admin'],
            component: {
              is: 'el-switch',
              events: record => {
                return {
                  change() {
                    console.log('record: ', record);
                  }
                };
              }
            }
          }
        ],
        operationList: [
          {
            key: 'key',
            props: {
              width: 200,
              label: '操作2'
            },
            butns: [
              { label: '自定义1', props: {}, handle: () => {} },
              { label: '自定义2', props: {}, handle: () => {} }
            ]
          }
        ],
        operation: {
          props: {
            width: 260
          },
          edit: {
            permission: ['admin'],
            label: '编辑',
            props: {},
            handle: ({ record }) => {
              console.log('record: ', record);
            }
          },
          del: {
            permission: ['admin'],
            props: {},
            handle: ({ record }) => {
              console.log('record: ', record);
            }
          },
          butns: [{ label: '自定义', props: {}, handle: () => {} }]
        }
      }
    };
  },
  computed: {},
  created() {
    // window.PermissionRole = [];
    this.getData();
  },
  methods: {
    getData() {
      const data = [];
      for (let i = 0; i < 10; i++) {
        data.push({
          id: i,
          name: '名称' + i,
          title: '标题',
          mobile: i * 1000 * 23 - 188 * i * 26,
          status: i % 3 === 0
        });
      }
      console.log('data: ', data);
      this.table.data = data;
    }
  }
};
</script>

<style lang="scss" scoped></style>
