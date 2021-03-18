<template>
  <div>
    <div>test</div>
    <RenderDto :render="render1" :scope="{}" />
  </div>
</template>

<script>
import RenderDto from '../../../../packages/jk-assembler/utils/Dito';
const render1 = h => <div>222</div>;
export default {
  components: { RenderDto },
  data() {
    return {
      render1: render1
    };
  },
  computed: {},
  created() {},
  methods: {}
};
</script>

<style lang="scss" scoped></style>
