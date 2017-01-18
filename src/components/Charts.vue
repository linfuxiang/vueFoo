<template>
    <div class="charts">
        <header>{{header}}</header>
        <!-- <top :jsonData="jsonData" keep-alive v-if="showWhichComponent == 1"></top> -->
        <!-- <geo :jsonData="jsonData" keep-alive v-if="showWhichComponent == 2"></geo> -->
        <!-- <transition name="fade"> -->
            <!-- <keep-alive> -->
                <!-- <transition name="fade" mode="out-in"> -->
                <component class="charts_com" :is="showWhichComponent"></component>
                <!-- </transition> -->
            <!-- </keep-alive> -->
        <!-- </transition> -->
        
        <button @click="charts_change">切换图表&gt;</button>
    </div>
</template>
<script>
import top from './Bar'
// import geo from './Geo'
// import GLOBAL_PATH from 'static/path.js'
import { mapState } from 'vuex'
import { mapMutations } from 'vuex'
import { mapActions } from 'vuex'

export default {
    data() {
        return {
            
        }
    },
    computed: {
        ...mapState({
            header: state => state.charts.header,
            jsonData: state => state.charts.jsonData,
            showWhichComponent: state => state.charts.showWhichComponent,
        })
    },
    components: {
        top: top,
        geo: function(resolve){
            require(['./Geo'], resolve);
        }
    },
    methods: {
        ...mapMutations(['global_toggleLoading', 'charts_change']),
        ...mapActions(['charts_getData']),
    },
    mounted() {
        this.charts_getData();
    },
    activated() {
    },
    deactivated() {
    },
    beforeRouteLeave (to, from, next) {
        this.global_toggleLoading();
        next();
        // 在渲染该组件的对应路由被 confirm 前调用
        // 不！能！获取组件实例 `this`
        // 因为当钩子执行前，组件实例还没被创建
    }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
$buttonColor: #A5DE37;
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s
}
.fade-enter, .fade-leave-active {
  opacity: 0
}
button {
    background-color: $buttonColor;
    color: #FFF;
    border: 1px solid $buttonColor;
    padding: 5px 10px;
    font-size: 20px;
    outline: none;
    cursor: pointer;
}
.charts_com{
    margin: 0 auto;
}
</style>
