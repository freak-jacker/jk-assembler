<template>
  <div class="app-wrapper">
    <sidebar class="sidebar-container" :my-routes="routes" />
    <div class="main-container">
      <router-view />
    </div>
  </div>
</template>

<script>
import { routes } from '../../router/index';

import Sidebar from './Sidebar';

export default {
  components: { Sidebar },
  data() {
    return {
      routes
    };
  },
  computed: {},
  methods: {}
};
</script>

<style lang="scss" scoped>
@import '../../styles/mixin.scss';
@import '../../styles/variables.scss';

.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
  &.mobile.openSidebar {
    position: fixed;
    top: 0;
  }
}
</style>
