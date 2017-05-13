<template>
    <div class="details">
        <!-- <h1>{{ msg }}</h1> -->
        <!-- <input v-model="searchVal" @keyup.enter="details_search" placeholder="输入为空则搜索全部数据"> -->
        <!-- <button @click="details_search" :disabled="!abledToSearch" :class="{unabled: !abledToSearch}">搜索</button> -->
        <div class="input-group">
            <div class="input devi">
            <el-date-picker v-model="dateVal" align="right" type="date" placeholder="选择日期" :picker-options="pickerOptions" style="width: 100%;"></el-date-picker>
            </div>
            <div class="input">
                <el-radio-group v-model="hourVal">
                    <el-radio-button label="6:00"></el-radio-button>
                    <el-radio-button label="12:00"></el-radio-button>
                    <el-radio-button label="21:00"></el-radio-button>
                </el-radio-group>
            </div>
            <div @keyup.enter="details_search" class="input devi">
                <el-input placeholder="输入为空则搜索全部数据" v-model="searchVal" icon="search" :on-icon-click="details_search"></el-input>
            </div>
        </div>
        <el-table :data="jsonData" style="width: 100%" :row-class-name="setRowClass" height="600">
            <el-table-column type="expand" :formatter="formatter">
                <template scope="props">
                    <el-form label-position="left" inline class="demo-table-expand">
                        <el-form-item label="首要污染物">
                            <span>{{ props.row.pri }}</span>
                        </el-form-item>
                        <el-form-item label="pm2.5">
                            <span>{{ props.row.pm25 }}</span>
                        </el-form-item>
                        <el-form-item label="pm10">
                            <span>{{ props.row.pm10 }}</span>
                        </el-form-item>
                        <el-form-item label="一氧化碳">
                            <span>{{ props.row.co }}</span>
                        </el-form-item>
                        <el-form-item label="二氧化氮">
                            <span>{{ props.row.no2 }}</span>
                        </el-form-item>
                        <el-form-item label="臭氧一小时平均">
                            <span>{{ props.row.o3 }}</span>
                        </el-form-item>
                        <el-form-item label="臭氧八小时平均">
                            <span>{{ props.row.o3_8h }}</span>
                        </el-form-item>
                        <el-form-item label="二氧化硫">
                            <span>{{ props.row.so2 }}</span>
                        </el-form-item>
                    </el-form>
                </template>
            </el-table-column>
            <el-table-column label="#" prop="index" width="80"></el-table-column>
            <el-table-column label="城市" prop="city" :filters="[{ text: '只看' + city + '及其排名附近', value: index }]" :filter-method="filterTag" filter-placement="bottom-start"></el-table-column>
            <el-table-column label="AQI指数" prop="aqi"></el-table-column>
            <el-table-column label="污染等级" prop="situ"></el-table-column>
        </el-table>
        <!-- <el-table :default-sort = "{prop: 'AQI', order: 'descending'}" :data="jsonData" height="600" border style="width: 100%" :row-class-name="setRowClass">
            <el-table-column type="index" label="#" width="80"></el-table-column>
            <el-table-column prop="city" label="城市" width="80"></el-table-column>
            <el-table-column prop="aqi" sortable label="AQI" width="90"></el-table-column>
            <el-table-column prop="situ" label="等级" width="70"></el-table-column>
            <el-table-column prop="pri" label="首要污染物"></el-table-column>
            <el-table-column :formatter="formatter" sortable prop="pm25" label="PM 2.5" width="110"></el-table-column>
            <el-table-column :formatter="formatter" sortable prop="pm10" label="PM 10" width="110"></el-table-column>
            <el-table-column :formatter="formatter" sortable prop="co" label="CO" width="110"></el-table-column>
            <el-table-column :formatter="formatter" sortable prop="no2" label="NO2" width="110"></el-table-column>
            <el-table-column :formatter="formatter" sortable prop="o3" label="O3" width="110"></el-table-column>
            <el-table-column :formatter="formatter" sortable prop="o3_8h" label="O3_8h" width="110"></el-table-column>
            <el-table-column :formatter="formatter" sortable prop="so2" label="SO2" width="110"></el-table-column>
        </el-table> -->
        <img src="static/img/a.jpg" :style="{top: y, left: x, filter: filter}" v-show="showPic" alt="">
    </div>
</template>
<script>
import GLOBAL_PATH from 'static/path.js'
import { mapState } from 'vuex'
import { mapMutations } from 'vuex'
import { mapActions } from 'vuex'

export default {
    data() {
        return {
        	timeout: null,
        	showPic: false,
	        x: '0px',
	        y: '0px',
	        opacity: 100,
	        blur: 0,
            pickerOptions: {
                disabledDate(time) {
                    return time.getTime() > Date.now();
                },
                shortcuts: [
                    {
                        text: '今天',
                        onClick(picker) {
                            picker.$emit('pick', new Date());
                        }
                    }, 
                ]
            },
        }
    },
    computed: {
    	...mapState({
    		msg: state => state.details.msg,
    		jsonData: state => state.details.jsonData,
    		lastsearchVal: state => state.details.lastsearchVal,
    		abledToSearch: state => state.details.abledToSearch,
    		city: state => state.city.city,
            index: state => state.details.index,
    	}),
    	filter: function() {
    		return 'opacity(' + this.opacity + ') blur(' + this.blur + 'px)' 
    	},
    	searchVal: {
    		get () {
		      	return this.$store.state.details.searchVal
		    },
		    set (value) {
		      	this.$store.commit('details_update_searchVal', value)
		    }
    	},
        dateVal: {
            get () {
                return this.$store.state.details.dateVal
            },
            set (value) {
                this.$store.commit('details_update_dateVal', value)
            }
        },
        hourVal: {
            get () {
                return this.$store.state.details.hourVal
            },
            set (value) {
                this.$store.commit('details_update_hourVal', value)
            }
        }
    },
    methods: {
        ...mapMutations(['global_toggleLoading']),
        ...mapActions(['details_search']),
        filterTag(value, row) {
            console.log(this.index);
            return Math.abs(this.index - row.index) < 5;
        },
        formatter(row, col) {
            return row[col.property] == -1 ? '_' : row[col.property]
        },
        setRowClass(row, col) {
            return ('level' + ((row.situ == '优') ? 1 : (row.situ == '良') ? 2 : (row.situ == '轻度污染') ? 3 : (row.situ == '中度污染') ? 4 : (row.situ == '重度污染') ? 5 : 6))
        },
    	details_showPic(e, val) {
            clearTimeout(this.timeout);
            // console.log(e)
            if(e.type.toLowerCase() == 'mouseleave'){
            	this.showPic = false;
            	return;
            }
            this.timeout = setTimeout(function(){
            	switch(val){
            		case '优':
            			this.opacity = 100;
            			this.blur = 0;
            			break;
            		case '良':
            			this.opacity = 95;
            			this.blur = 0;
            			break;
        			case '轻度污染':
            			this.opacity = 90;
            			this.blur = 1;
            			break;
        			case '中度污染':
            			this.opacity = 80;
            			this.blur = 2;
            			break;	
        			case '重度污染':
            			this.opacity = 70;
            			this.blur = 2;
            			break;
            	}
                this.x = e.x - e.offsetX + e.target.clientWidth + 'px';
                this.y = e.y - e.offsetY + 'px';
                this.showPic = true;
            }.bind(this), 150)
        }
    },
    mounted() {
        // this.global_toggleLoading();
    },
    activated() {
    },
    deactivated() {
    },
    
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    .details {
        margin-top: 10px!important;
        .input-group {
            display: flex;
            justify-content: space-around;
            margin-bottom: 10px;
            .input {
                width: 25%;
                display: inline-block;
            }
            .devi {
                // position: relative;
                // top: -13px;
            } 
        }
    }
    
</style>
<style lang="scss">
	$buttonColor: #A5DE37;

	$thBgColor: #c5de89;
	$thFontColor: #fff;

	$level1BgColor: #4cc74c;
	$level2BgColor: #FFBB17;
	$level3BgColor: #C67901;
	$level4BgColor: #EB111B;
	$level5BgColor: #B3065B;
	$level6BgColor: #600202;

	@mixin blockCenter{
		margin: 0 auto;
		display: block;
		margin-top: 10px;
	}
	@mixin inputClass{
		padding: 5px;
		outline: none;
		border-radius: 5px;
		font-size: 20px;
	}

	.level1{
        td{
            color: $level1BgColor;
        }
	}
	.level2{
        td{
	        color: $level2BgColor;
        }
	}
	.level3{
        td{
		    color: $level3BgColor;
        }
	}
	.level4{
        td{
		    color: $level4BgColor;
        }
	}
	.level5{
        td{
		    color: $level5BgColor;
        }
	}
	.level6{
        td{
			color: $level6BgColor;
        }
	}
	img{
    	width: 200px;
    	position: fixed;
	}
    .cell {
        text-align: left;
    }
    .demo-table-expand label {
        width: 150px;
        color: #99a9bf;
    }
    .demo-table-expand .el-form-item {
        margin-right: 0;
        margin-bottom: 0;
        width: 48%;
        text-align: left;
    }
</style>
