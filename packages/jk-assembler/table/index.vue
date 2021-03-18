<template>
  <div class="assembler-table">
    <el-table
      ref="Table"
      :data="data"
      v-bind="
        Object.assign(
          {
            border: true,
            stripe: true,
            highlightCurrentRow: true,
            rowKey: 'id'
          },
          props
        )
      "
      v-on="events"
    >
      <template v-for="(column, index) in columns">
        <el-table-column
          :key="`column_index_${index}`"
          v-if="['selection', 'index'].includes(column.type)"
          v-bind="
            Object.assign(
              {
                align: 'center'
              },
              column
            )
          "
        >
        </el-table-column>

        <el-table-column
          :key="`column_${column.prop}_${index}`"
          v-else
          v-bind="
            Object.assign(
              {
                align: 'center'
              },
              column
            )
          "
        >
          <template slot-scope="scope">
            <template v-if="column.component">
              <component
                :is="column.component.is"
                v-permission="column.permission"
                v-model="scope.row[column.prop]"
                v-bind="column.component.props"
                :scope="{
                  value: scope.row[column.prop],
                  record: scope.row,
                  index: scope.$index,
                  rows: data
                }"
                v-on="
                  column.component.events
                    ? column.component.events(scope.row)
                    : {}
                "
              />
            </template>
            <template v-else-if="column.render">
              <Dito
                v-permission="column.permission"
                :render="column.render"
                :scope="{
                  value: scope.row[column.prop],
                  record: scope.row,
                  index: scope.$index,
                  rows: data
                }"
              />
            </template>
            <template v-else>
              {{ scope.row[column.prop] }}
            </template>
          </template>
        </el-table-column>
      </template>

      <!-- operations list -->
      <template v-if="operationList.length">
        <el-table-column
          v-for="operats in operationList"
          :key="operats.key"
          v-bind="
            Object.assign(
              {
                label: '其他操作项',
                align: 'center'
              },
              operats.props
            )
          "
        >
          <template slot-scope="scope">
            <el-button
              v-for="item in operats.butns"
              :key="item.label"
              v-permission="item.permission"
              v-bind="Object.assign({}, item.props)"
              @click="
                item.handle &&
                  item.handle({
                    record: scope.row,
                    index: scope.$index,
                    rows: data
                  })
              "
            >
              {{ item.label }}
            </el-button>
          </template>
        </el-table-column>
      </template>
      <!-- operations -->
      <template v-if="operation">
        <el-table-column
          v-bind="
            Object.assign(
              {
                label: '操作',
                fixed: 'right',
                align: 'center',
                width: '160'
              },
              operation.props
            )
          "
        >
          <template slot-scope="scope">
            <el-button
              v-if="operation.edit"
              v-permission="operation.edit.permission"
              v-bind="
                Object.assign(
                  {
                    icon: 'el-icon-edit-outline',
                    type: 'success',
                    plain: true
                  },
                  operation.edit.props
                )
              "
              @click="
                operation.edit.handle
                  ? operation.edit.handle({
                      record: scope.row,
                      index: scope.$index,
                      rows: data
                    })
                  : $emit('edit', {
                      record: scope.row,
                      index: scope.$index,
                      rows: data
                    })
              "
            >
              {{ operation.edit.label }}
            </el-button>
            <el-button
              v-if="operation.del"
              v-permission="operation.del.permission"
              v-bind="
                Object.assign(
                  {
                    icon: 'el-icon-document-delete',
                    type: 'danger',
                    plain: true
                  },
                  operation.del.props
                )
              "
              @click="
                operation.del.handle
                  ? operation.del.handle({
                      record: scope.row,
                      index: scope.$index,
                      rows: data
                    })
                  : $emit('del', {
                      record: scope.row,
                      index: scope.$index,
                      rows: data
                    })
              "
            >
              {{ operation.del.label }}
            </el-button>
            <el-button
              v-for="item in operation.butns"
              :key="item.label"
              v-permission="item.permission"
              v-bind="Object.assign({}, item.props)"
              @click="
                item.handle &&
                  item.handle({
                    record: scope.row,
                    index: scope.$index,
                    rows: data
                  })
              "
            >
              {{ item.label }}
            </el-button>
          </template>
        </el-table-column>
      </template>
    </el-table>
  </div>
</template>

<script>
import Dito from '../utils/Dito';
import { permissionMixin } from '../utils/mixin';
import { isObject, isFunction } from '../utils';
export default {
  name: 'JkAssemblerTable',
  components: { Dito },
  mixins: [permissionMixin],
  props: {
    data: { type: [Array], default: () => [] },
    props: { type: Object, default: () => {} },
    events: { type: Object, default: () => {} },
    columns: { type: Array, default: () => [] },
    operation: { type: Object, default: () => {} },
    operationList: { type: Array, default: () => [] }
  },
  data() {
    return {};
  },
  computed: {},
  created() {},
  methods: {}
};
</script>

<style lang="scss" scoped></style>
