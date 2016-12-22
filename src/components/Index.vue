<template>
    <div class="index">
        <header>{{header}}</header>
        <!-- <top :jsonData="jsonData" keep-alive v-if="showWhichComponent == 1"></top> -->
        <!-- <geo :jsonData="jsonData" keep-alive v-if="showWhichComponent == 2"></geo> -->
        <keep-alive>
            <!-- <transition name="fade" mode="out-in"> -->
            <component :jsonData="jsonData" :is="showWhichComponent"></component>
            <!-- </transition> -->
        </keep-alive>
        <button @click="change">切换图表&gt;</button>
    </div>
</template>
<script>
import top from './Top'
import geo from './Geo'

export default {
    data() {
        return {
            header: '实时空气质量指数(AQI)监测',
            jsonData: [],
            apiUrl: 'http://superlfx.cn:10011',
            showWhichComponent: 'top'
        }
    },
    components: {
        'top': top,
        'geo': geo
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
        console.log(this.$route.query.last);
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
    }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
$buttonColor: #A5DE37;
.fade-transition {
    transition: opacity 3s ease;
}
.fade-enter, .fade-leave {
    opacity: 0;
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
