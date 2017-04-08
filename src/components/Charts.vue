<template>
    <div class="charts">
        <!-- <header>{{header}}</header> -->
        <!-- <top :jsonData="jsonData" keep-alive v-if="showWhichComponent == 1"></top> -->
        <!-- <geo :jsonData="jsonData" keep-alive v-if="showWhichComponent == 2"></geo> -->
        <!-- <transition name="fade"> -->
            <keep-alive>
                <!-- <transition name="fade" mode="out-in"> -->
                <component class="charts_com" :is="showWhichComponent"></component>
                <!-- </transition> -->
            </keep-alive>
        <!-- </transition> -->
        <el-button type="primary" @click="charts_change">切换图表<i class="el-icon-arrow-right el-icon--right"></i></el-button>
    </div>
</template>
<script>
// import bar from './Bar'
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
        bar: function(resolve){
            require(['./charts/Bar'], resolve);
        },
        geo: function(resolve){
            require(['./charts/Geo'], resolve);
        },
        lines: function(resolve){
            require(['./charts/Line'], resolve);
        }
    },
    methods: {
        ...mapMutations(['charts_change']),
        ...mapActions(['charts_getData']),
    },
    mounted() {
        this.charts_getData();
    },
    activated() {
    },
    deactivated() {
    },
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
.charts_com{
    margin: 0 auto;
}
</style>
