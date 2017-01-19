<template>
    <div class="bar">
        <div ref="best20" style="width: 1100px;height: 400px;"></div>
        <div ref="worst20" style="width: 1100px;height: 400px;"></div>
    </div>
</template>
<script>
import echarts from 'echarts/lib/echarts'
import 'echarts/lib/chart/bar'
import { mapState } from 'vuex'
// import { mapMutations } from 'vuex'

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
    computed: {
        ...mapState({
            jsonData: state => state.charts.jsonData
        })
    },
    methods: {
    },
    beforeDestroy() {
    },
    mounted() {
		// this.best20 = echarts.init(document.getElementById('best20')), 
		// this.worst20 = echarts.init(document.getElementById('worst20'));
        this.best20 = echarts.init(this.$refs.best20),
        this.worst20 = echarts.init(this.$refs.worst20);
		let today = new Date();
		let optionObj = {
			colorList : ['#4cc74c', '#FFBB17', '#ffbc66', '#ff7a7a', '#d21e1e', '#783535'],
			time: ' ' +  today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate() + ' ' + today.getHours() + ':00',
			yTitle: 'AQI指数'
		}
        this.jsonData.forEach((val, key) => {
            if(key < 20){
                this.bestX.push(val.city);
                this.bestY.push(val.aqi);
            }
            if(key > this.jsonData.length - 20){
                this.worstX.push(val.city);
                this.worstY.push(val.aqi);
            }
        });
		// 绘制图表
        this.best20.setOption({
            baseOption: {
                title: { text: '最优Top20' + optionObj.time },
                tooltip: {},
                xAxis: {
                    data: this.bestX
                },
                series: [{
                    // name: 'PM2.5指数',
                    // type: 'bar',
                    data: this.bestY
                }],
                yAxis: {
                    name: optionObj.yTitle,
                    max: 200
                },
                series: [{
                    name: optionObj.yTitle,
                    type: 'bar',
                    data: this.bestY,
                    itemStyle: {
                        normal: {
                            color: function(val){
                                var value = val.data;
                                if(value <= 50) {
                                    return optionObj.colorList[0];
                                } else if(value <= 100) {
                                    return optionObj.colorList[1];
                                } else if(value <= 150) {
                                    return optionObj.colorList[2];
                                } else if(value <= 200) {
                                    return optionObj.colorList[3];
                                } else if(value <= 300) {
                                    return optionObj.colorList[4];
                                } else {
                                    return optionObj.colorList[5];
                                }
                            }
                        }
                    }
                }],
            },
            media: [
                {
                    query: {
                        maxWidth: 750
                    },
                    option: {
                        
                    }
                }
            ]
        });
        this.worst20.setOption({
            title: { text: '最差Top20' + optionObj.time },
            tooltip: {},
            xAxis: {
                data: this.worstX,
                inverse: true
            },
            series: [{
                // name: 'PM2.5指数',
                // type: 'bar',
                data: this.worstY
            }],
            yAxis: {
                name: optionObj.yTitle,
                max: 500
            },
            series: [{
                name: optionObj.yTitle,
                type: 'bar',
                data: this.worstY,
                itemStyle: {
                	normal: {
                		color: function(val){
                			var value = val.data;
                			if(value <= 50) {
                				return optionObj.colorList[0];
                			} else if(value <= 100) {
                				return optionObj.colorList[1];
                			} else if(value <= 150) {
                				return optionObj.colorList[2];
                			} else if(value <= 200) {
                				return optionObj.colorList[3];
                			} else if(value <= 300) {
                				return optionObj.colorList[4];
                			} else {
                				return optionObj.colorList[5];
                			}
                		}
                	}
                }
            }]
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
.bar{
    div{
        margin: 0 auto;
    }
}
</style>
