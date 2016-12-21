<template>
    <div class="index">
        <div id="best20" style="width: 1024px;height: 400px;"></div>
        <div id="worst20" style="width: 1024px;height: 400px;"></div>
    </div>
</template>
<script>
import echarts from 'echarts';

export default {
    data() {
        return {
        	best20: null,
        	worst20: null,
        	bestX: [],
        	bestY: [],
        	worstX: [],
        	worstY: []
        }
    },
    methods: {
    },
    props:[
    	'jsonData'
    ],
    mounted() {
    	let today = new Date();
		let str = ' ' +  today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate() + ' ' + today.getHours() + ':00';
		this.best20 = echarts.init(document.getElementById('best20')), 
		this.worst20 = echarts.init(document.getElementById('worst20'));
		// 绘制图表
        this.best20.setOption({
            title: { text: '最优Top20' + str },
            tooltip: {},
            xAxis: {
                data: this.bestX
            },
            yAxis: {
                name: 'PM2.5指数',
                max: 200
            },
            series: [{
                name: 'PM2.5指数',
                type: 'bar',
                data: this.bestY
            }]
        });
        this.worst20.setOption({
            title: { text: '最差Top20' + str },
            tooltip: {},
            xAxis: {
                data: this.worstX,
                inverse: true
            },
            yAxis: {
                name: 'PM2.5指数',
                max: 600
            },
            series: [{
                name: 'PM2.5指数',
                type: 'bar',
                data: this.worstY
            }]
        });
    	this.$watch('jsonData', function (newVal, oldVal) {
			this.jsonData.forEach((val, key) => {
	            if(key < 20){
	                this.bestX.push(val.city);
	                this.bestY.push(val.num);
	            }
	            if(key > this.jsonData.length - 20){
	                this.worstX.push(val.city);
	                this.worstY.push(val.num);
	            }
	        });
	        this.best20.setOption({
	            xAxis: {
	                data: this.bestX
	            },
	            series: [{
	                name: 'PM2.5指数',
	                type: 'bar',
	                data: this.bestY
	            }]
	        });
	        this.worst20.setOption({
	            xAxis: {
	                data: this.worstX,
	                inverse: true
	            },
	            series: [{
	                name: 'PM2.5指数',
	                type: 'bar',
	                data: this.worstY
	            }]
	        });	        
		});
    },
    activated() {
		// console.log(3);
    },
    deactivated() {
    	// console.log(4);
    }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
#best20, #worst20{
	margin: 0 auto;
}
</style>
