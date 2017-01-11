<template>
    <div id="app" v-if="!isMobile">
        <navi></navi>
        <!-- <keep-alive> -->
            <router-view :isShowLoading="isShowLoading"></router-view>
        <!-- </keep-alive> -->
        <tips></tips>
        <user></user>
        <loading v-show="isShowLoading"></loading>
    </div>
    <div id="app" v-else>{{isMobile ? '请用电脑浏览器打开' : ''}}</div>
</template>
<script>
import navi from './components/Navi'
import tips from './components/Tips'
import user from './components/User'
import loading from './components/Loading'

export default {
    name: 'app',
    data() {
        return {
            isMobile: '',
            isShowLoading: false,
            needShowLoading: true
        }
    },
    components: {
        navi,
        tips,
        user,
        loading
    },
    mounted() {
        // 没做移动端适配前，判断是否手机浏览器
        var UA = navigator.userAgent,
            isAndroid = /android|adr/gi.test(UA),
            isIos = /iphone|ipod|ipad/gi.test(UA) && !isAndroid,
            isMobile = isAndroid || isIos;
        this.isMobile = isMobile;
        if(isMobile){
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
