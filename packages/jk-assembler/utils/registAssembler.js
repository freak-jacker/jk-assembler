/**
 * 已废弃
 * 提供一个默认拼装的注册器结构
 * @param {filterList, tableColumns, fields}
 * @param {*} TableApi
 */

export default function registAssembler(
  { filterList, tableColumns, fields },
  TableApi
) {
  return function(Vue) {
    const vm = {
      Vue,
      TableApi
    };
    const filter = getFilterAssembler.call(vm, filterList);
    const table = getTableAssembler.call(vm, tableColumns);
    const form = getFormAssembler.call(vm, fields);
    return {
      __searchList: (queryParams = {}) => {
        return TableApi.getList(queryParams);
      },
      filter,
      table,
      form
    };
  };
}

function getFilterAssembler(filterList) {
  if (!filterList) {
    return null;
  }
  return {
    showSearchButton: true, // 显示搜索按钮
    showAddButton: true, // 显示新增按钮
    filterList: filterList
  };
}

function getTableAssembler(tableColumns) {
  if (!tableColumns) {
    return null;
  }
  return {
    data: [],
    tableEvents: {},
    tableColumns,
    rowOperateList: [
      {
        key: 'edit',
        props: {
          icon: 'el-icon-edit-outline',
          type: 'success',
          plain: true
        }
      },
      {
        props: {
          icon: 'el-icon-document-delete',
          type: 'danger',
          plain: true,
          size: 'small'
        },
        event: async (record, index, rows) => {
          await this.Vue.$confirm('你确定要删除吗', '温馨提示', {
            type: 'warning'
          });
          const { code } = await this.TableApi.del(record.id);
          if (code === 200) {
            this.Vue.refresh();
            this.Vue.$message.success('删除成功！');
          }
        }
      }
    ]
  };
}

function getFormAssembler(fields) {
  if (!fields) {
    return null;
  }
  return {
    fields,
    formProps: {},
    formEvents: {},
    submit: async row => {
      if (row.id) {
        await this.TableApi.update(row);
      } else {
        await this.TableApi.add(row);
      }
      this.Vue.refresh();
      this.Vue.showFormPanel = false;
    }
  };
}
