<template>
    <div class="index">
        <div id="geo" style="width: 1024px;height: 400px;"></div>
    </div>
</template>
<script>
import echarts from 'echarts';

export default {
    name: 'nav',
    data() {
        return {
            header: '数读PM2.5',
            navLists: ['Index', 'Vue', 'About Me'],
            apiUrl: 'http://superlfx.cn:10011'
        }
    },
    methods: {
        
    },
    mounted() {
        console.log(this.$route.query.last);
        let today = new Date();
        let str = ' ' +  today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate() + ' ' + today.getHours() + ':00';
    	this.$http.jsonp(this.apiUrl).then((res) => {
            this.jsonData = res.data;
            var bestX = [], bestY = [], worstX = [], worstY = [];
            this.jsonData.forEach((val, key) => {
                if(key < 20){
                    bestX.push(val.city);
                    bestY.push(val.num);
                }
                if(key > this.jsonData.length - 20){
                    worstX.push(val.city);
                    worstY.push(val.num);
                }
                
            });
            var best20 = echarts.init(document.getElementById('best20')), 
            worst20 = echarts.init(document.getElementById('worst20'));
            // 绘制图表
            best20.setOption({
                title: { text: '最优Top20' + str },
                tooltip: {},
                xAxis: {
                    data: bestX
                },
                yAxis: {
                    name: 'PM2.5指数',
                    max: 200
                },
                series: [{
                    name: 'PM2.5指数',
                    type: 'bar',
                    data: bestY
                }]
            });
            worst20.setOption({
                title: { text: '最差Top20' + str },
                tooltip: {},
                xAxis: {
                    data: worstX,
                    inverse: true
                },
                yAxis: {
                    name: 'PM2.5指数',
                    max: 600
                },
                series: [{
                    name: 'PM2.5指数',
                    type: 'bar',
                    data: worstY
                }]
            });
        }, (err) => {
            console.log(err);
        });
    
    }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
