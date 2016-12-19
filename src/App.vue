<template>
    <div id="app">
        <navi></navi>
        <router-view keep-alive></router-view>
    </div>
</template>
<script>
import navi from './components/Navi'

export default {
    name: 'app',
    components: {
        navi
    }
}
</script>
<style>
* {
    padding: 0;
    margin: 0;
}

#app {
    font-family: Helvetica Neue,Helvetica,Arial,PingFang SC,Hiragino Sans GB,WenQuanYi Micro Hei,Microsoft Yahei,sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    padding-top: 8px;
}
    
li {
    list-style: none;
}

a{
    text-decoration: none;
}
</style>
