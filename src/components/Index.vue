<template>
    <div class="index">
        <header>{{header}}</header>
        <!-- <top :jsonData="jsonData" keep-alive v-if="showWhichComponent == 1"></top> -->
        <!-- <geo :jsonData="jsonData" keep-alive v-if="showWhichComponent == 2"></geo> -->
        <keep-alive transition-mode="out-in" transition="fade">
            <component :jsonData="jsonData" :is="showWhichComponent"></component>
        </keep-alive>
        <button @click="change">点击</button>
    </div>
</template>
<script>
import top from './Top'
import geo from './Geo'

export default {
    data() {
        return {
            header: '实时PM2.5监测',
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
        this.$http.jsonp(this.apiUrl).then((res) => {
            this.jsonData = res.data.data;
        }, (err) => {
            console.log(err);
        });
    }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.fade-transition {
  transition: opacity .3s ease;
}
.fade-enter, .fade-leave {
  opacity: 0;
}
</style>
