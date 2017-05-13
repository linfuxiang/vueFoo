<template>
    <div class="lines">
        <el-date-picker v-model="datesArray" type="daterange" align="right" placeholder="选择日期范围" :picker-options="pickerOptions2"></el-date-picker>
        <el-autocomplete class="inline-input" v-model="searchCity" :fetch-suggestions="querySearch" placeholder="请输入地区" :trigger-on-focus="false" @select="handleSelect"></el-autocomplete>
        <el-button type="primary" icon="search" @click="search">搜索</el-button>
        <div ref="lines" style="width: 960px;height: 600px;"></div>
    </div>
</template>
<script>
import echarts from 'echarts/lib/echarts'
import 'echarts/lib/chart/line'
import 'echarts/lib/component/title'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/toolbox'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/markPoint'
import 'echarts/lib/component/markLine'
import GLOBAL_PATH from 'static/path.js'
import { mapState } from 'vuex'
// import { mapMutations } from 'vuex'

export default {
    data() {
        return {
            pickerOptions2: {
                shortcuts: [{
                    text: '最近一周',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                        picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '最近一个月',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                        picker.$emit('pick', [start, end]);
                    }
                }]
            },
            datesArray: '',
            cityList: [],
            map: null,
            searchCity: '',
        }
    },
    computed: {
        ...mapState({
            city: state => state.city.city
        }),
    },
    methods: {
        tipError(text) {
            this.$message({
                showClose: true,
                message: text,
                type: 'error'
            });
        },
        querySearch(queryString, cb) {
            var cityList = this.cityList;
            var results = queryString ? cityList.filter(this.createFilter(queryString)) : cityList;
            // 调用 callback 返回建议列表的数据
            cb(results);
        },
        createFilter(queryString) {
            return (city) => {
                return (city.value.indexOf(queryString.toLowerCase()) != -1);
            };
        },
        handleSelect(item) {
            // console.log(item);
        },
        search() {
            // console.log(this.datesArray);
            this.$http.get(GLOBAL_PATH.JSONP_URI + 'getData2', {
                params: {
                    'reqArea': this.searchCity,
                    'time': JSON.stringify(this.datesArray)
                }
            }).then((res) => {
                if (res.data.code == 101) {
                    this.tipError('暂无此数据');
                    return;
                }
                let xAxis = [];
                let data = res.data.res.map(function(item, idx) {
                    xAxis[idx] = item.date;
                    return item[0].aqi;
                });
                this.map.setOption({
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        data: xAxis
                    },
                    legend: {
                        data: [this.city]
                    },
                    series: [{
                        name: this.city,
                        type: 'line',
                        data: data,
                        markPoint: {
                            data: [{
                                type: 'max',
                                name: '最大值'
                            }, {
                                type: 'min',
                                name: '最小值'
                            }]
                        },
                        markLine: {
                            data: [{
                                type: 'average',
                                name: '平均值'
                            }]
                        },
                    }]
                })
            }, (err) => {

            });
        }
    },
    beforeDestroy() {},
    mounted() {
        this.searchCity = this.city;
        if (sessionStorage.cityList) {
            this.cityList = sessionStorage.cityList.split(',').map(item => {
                return {
                    value: item,
                    label: item
                };
            });
        } else {

        }
        let option = {
            title: {
                text: '空气质量变化',
            },
            tooltip: {
                trigger: 'axis'
            },
            toolbox: {
                show: true,
                feature: {
                    dataZoom: {
                        yAxisIndex: 'none'
                    },
                    dataView: {
                        readOnly: false
                    },
                    magicType: {
                        type: ['line', 'bar']
                    },
                    restore: {},
                    saveAsImage: {}
                }
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: []
            },
            yAxis: {
                type: 'value',
                axisLabel: {
                    formatter: '{value}'
                }
            },
            series: []
        };
        this.map = echarts.init(this.$refs.lines);
        this.map.setOption(option);
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
.lines {
    margin-top: 10px;
    div {
        margin: 0 auto;
    }
}
</style>
