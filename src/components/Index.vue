<template>
    <div class="index">
        <header>{{header}}</header>
        <!-- <top :jsonData="jsonData" keep-alive v-if="showWhichComponent == 1"></top> -->
        <!-- <geo :jsonData="jsonData" keep-alive v-if="showWhichComponent == 2"></geo> -->
        <!-- <transition name="fade"> -->
            <keep-alive>
                <!-- <transition name="fade" mode="out-in"> -->
                <component :jsonData="jsonData" :is="showWhichComponent"></component>
                <!-- </transition> -->
            </keep-alive>
        <!-- </transition> -->
        
        <button @click="change">切换图表&gt;</button>
    </div>
</template>
<script>
import top from './Top'
// import geo from './Geo'
import GLOBAL_PATH from 'static/path.js'

export default {
    data() {
        return {
            header: '实时空气质量指数(AQI)监测',
            jsonData: [],
            apiUrl: GLOBAL_PATH.JSONP_URI,
            showWhichComponent: 'top'
        }
    },
    components: {
        top: top,
        geo: function(resolve){
            require(['./Geo'], resolve);
        }
    },
    methods: {
        change() {
            if(this.showWhichComponent == 'top'){
                this.showWhichComponent = 'geo';
            } else {
                this.showWhichComponent = 'top';
            }
        }
    },
    mounted() {
        // console.log(this.$route.query.last);
        this.$http.jsonp(this.apiUrl, {
            params: {
                'reqCollection': 'latest',
                'reqArea': ''
            }
        }).then((res) => {
            this.jsonData = res.data.data;
        }, (err) => {
            console.log(err);
        });
        // console.log('open');
        // this.$parent.isShowLoading = false;
    },
    activated() {
        // console.log('open');
        // this.$parent.isShowLoading = false;
    },
    deactivated() {
        // console.log('closed');
        // this.$parent.isShowLoading = true;
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
</style>
