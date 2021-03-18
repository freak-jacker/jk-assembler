<template>
  <div>
    <span style="margin-right: 5px;">{{ scope.index + 1 }}</span>
    <el-button-group>
      <el-button
        :disabled="isFirst"
        class="sort-btn"
        icon="el-icon-top"
        size="mini"
        circle
        plain
        @click="updateSort(0)"
      />
      <el-button
        :disabled="isLast"
        class="sort-btn"
        icon="el-icon-bottom"
        size="mini"
        circle
        plain
        @click="updateSort(1)"
      />
    </el-button-group>
  </div>
</template>

<script>
export default {
  name: 'JkColumnSort',
  props: {
    value: {
      type: [String, Number],
      default: ''
    },
    scope: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    isFirst() {
      return this.scope.index === 0;
    },
    isLast() {
      return this.scope.rows.length - 1 === this.scope.index;
    }
  },
  methods: {
    updateSort(type) {
      const id = +this.scope.record['id'];
      const index = this.scope.index;

      if (type === 0) {
        const prev = this.scope.rows[index - 1];
        const prevId = prev.id;

        const data = {
          id1: id,
          id2: prevId
        };
        this.$emit('up', data);
      } else {
        const next = this.scope.rows[index + 1];
        const nextId = next.id;
        const data = {
          id1: id,
          id2: nextId
        };
        this.$emit('down', data);
      }
    }
  }
};
</script>

<style>
.sort-btn {
  padding: 5px;
}
</style>
