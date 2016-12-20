<template>
    <div class="index">
        <div id="best20" style="width: 1024px;height: 400px;"></div>
        <div id="worst20" style="width: 1024px;height: 400px;"></div>
        <!-- <table id="table">
            <tr>
                <th>城市</th>
                <th>指数</th>
                <th>状况</th>
            </tr>
            <tr v-for="item in jsonData">
                <td>{{item.city}}</td>
                <td>{{item.num}}</td>
                <td>{{item.situ}}</td>
            </tr>
        </table> -->
        <!-- <div>{{jsonData}}</div> -->
        <!-- <button @click="change">123</button> -->
    </div>
</template>
<script>
import echarts from 'echarts';

export default {
    data() {
        return {

        }
    },
    methods: {
    },
    props:[
    	'jsonData'
    ],
    mounted() {
    	this.$watch('jsonData', function (newVal, oldVal) {
			let today = new Date();
    		let str = ' ' +  today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate() + ' ' + today.getHours() + ':00';
    		let bestX = [], bestY = [], worstX = [], worstY = [];
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
		});
    }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
