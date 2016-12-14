<template>
  <div id="app">
    <router-view keep-alive></router-view>
  </div>
</template>

<script>
// import Hello from './components/Hello'
// import navi from './components/Navi'

export default {
  name: 'app',
  components: {
    // Hello,
    // navi
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
li{
  list-style: none;
}
</style>
