<template>
    <div id="app" class="content-container">
        <router-view></router-view>
    </div>
</template>
<script>
import ScrollTop from './components/common/ScrollTop.vue'
export default {
  components: {
    'scroll-top': ScrollTop
  }
}
</script>
<style>
    @import "./assets/css/main.css";
    @import "./assets/css/color-dark.css";     /*深色主题*/

    /*@import "./assets/css/theme-green/color-green.css";   浅绿色主题*/
</style>
