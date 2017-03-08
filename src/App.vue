<template>
    <!-- <div id="app" v-if="!isMobile"> -->
    <div id="app" v-if="!isMobile">
        <navi></navi>
        <!-- <keep-alive> -->
            <router-view></router-view>
        <!-- </keep-alive> -->
        <tips></tips>
        <user></user>
        <loading v-show="isShowLoading"></loading>
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
::-webkit-scrollbar  
{  
    width: 5px;
    background-color: transparent;
}  
  
/*定义滚动条轨道 内阴影+圆角*/  
::-webkit-scrollbar-track  
{  
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);  
    border-radius: 10px;  
    background-color: #F5F5F5;  
}  
  
/*定义滑块 内阴影+圆角*/  
::-webkit-scrollbar-thumb  
{  
    border-radius: 10px;  
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);  
    /*background-color: #e0e6ed;*/
    background-color: #555;
}  
</style>
