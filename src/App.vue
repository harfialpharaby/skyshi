<template>
  <div id="app">
    <page-header></page-header>
    <router-view></router-view>
  </div>
</template>

<script>
import PageHeader from '@/components/PageHeader.vue'

export default {
  name: 'App',
  components: {
    PageHeader
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@700&display=swap');

* {
  margin: 0;
}

#app {
  font-family: 'Poppins', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  background: #F4F4F4;
  min-height: 100vh;
}

.dashboard-container {
  padding: 0 220px;
}
</style>
