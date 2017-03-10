<template>
    <!-- <div id="app" v-if="!isMobile"> -->
    <div id="app" v-if="!isMobile">
        <navi></navi>
        <!-- <keep-alive> -->
            <router-view class="container"></router-view>
        <!-- </keep-alive> -->
        <tips></tips>
        <user></user>
        <advice></advice>
        <!-- <loading v-show="isShowLoading"></loading> -->
    </div>
    <div id="app" v-else>
        <router-view></router-view>
    </div>
</template>
<script>
import navi from './components/Navi'
import tips from './components/Tips'
import user from './components/User'
import loading from './components/Loading'
import advice from './components/Advice'
import { mapState } from 'vuex'
import { mapMutations } from 'vuex'

export default {
    name: 'app',
    data() {
        return {
            
        }
    },
    computed: mapState([
        'isMobile',
        'isShowLoading'
    ]),
    components: {
        navi,
        tips,
        user,
        loading,
        advice,
    },
    methods: {
        ...mapMutations(['global_setMobile'])
    },
    mounted() {
        // 没做移动端适配前，判断是否手机浏览器
        var UA = navigator.userAgent,
            isAndroid = /android|adr/gi.test(UA),
            isIos = /iphone|ipod|ipad/gi.test(UA) && !isAndroid,
            isMobile = isAndroid || isIos;
        this.global_setMobile(isMobile);
        if(isMobile){
            this.$router.push('charts')
            return false;
        }
    }
}
</script>
<style>
* {
    padding: 0;
    margin: 0;
}

#app {
    font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    /*padding-top: 8px;*/
}
    
li {
    list-style: none;
}

a{
    text-decoration: none;
}
/*::-webkit-scrollbar  
{  
    width: 5px;
    background-color: transparent;
}  
::-webkit-scrollbar-track  
{  
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);  
    border-radius: 10px;  
    background-color: #F5F5F5;  
}  
::-webkit-scrollbar-thumb  
{  
    border-radius: 10px;  
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
    background-color: #555;
}*/
.container {
    width: 960px!important;
    margin: 0 auto!important;
}
</style>
