<template>
    <div class="details">
        <h1>{{ msg }}</h1>
        <input v-model="searchArea" @keyup.enter="search" placeholder="输入为空则搜索全部数据">
        <button @click="search" :disabled="!abledToSearch" :class="{unabled: !abledToSearch}">搜索</button>
        <table cellspacing="0">
        	<tr>
        		<th>排序</th>
        		<th>城市</th>
        		<th>空气质量指数(AQI)</th>
        		<th>等级</th>
        	</tr>
        	<tr v-for="(val, idx) in jsonData" :id="val.city">
        		<td>{{idx + 1}}</td>
        		<td>{{val.city}}</td>
        		<td :class="[foo(val.situ)]">{{val.num}}</td>
        		<!-- <td :class="[('level' + ((val.situ=='优')?1:(val.situ=='良')?2:(val.situ=='轻度污染')?3:(val.situ=='中度污染')?4:(val.situ=='重度污染')?5:6))]">{{val.situ}}</td> -->
        		<td :class="[foo(val.situ)]">{{val.situ}}</td>
        	</tr>
        </table>
    </div>
</template>
<script>
import GLOBAL_PATH from 'static/path.js'

export default {
    data() {
        return {
            msg: '详细数据报表',
            apiUrl: GLOBAL_PATH.JSONP_URI,
            jsonData: [],
            searchArea: '',
            lastSearchArea: null,
            abledToSearch: true
        }
    },
    methods: {
    	foo(situ) {
			return ('level' + ((situ=='优')?1:(situ=='良')?2:(situ=='轻度污染')?3:(situ=='中度污染')?4:(situ=='重度污染')?5:6));
    	},
    	search() {
    		let searchArea = this.searchArea.trim();
    		if(this.lastSearchArea === searchArea || this.abledToSearch === false){
    			return false;
    		}
    		this.abledToSearch = false;
    		// let today = new Date();
	        // let collectionName = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate() + '_' + today.getHours() + ':00';
	        let collectionName = 'latest';
	        this.$http.jsonp(this.apiUrl + 'getData', {
	            params: {
	                'reqCollection': collectionName,
	                'reqArea': searchArea
	            }
	        }).then((res) => {
	            this.jsonData = res.data.data;
	            this.lastSearchArea = searchArea;
	            this.abledToSearch = true;
	        }, (err) => {
	            console.log(err);
	        });
    	}
    },
    mounted() {
    	// console.log(GLOBAL_PATH);
        // console.log(this.$route.query.last);
        // console.log('open');
        this.$parent.isShowLoading = false;
    },
    activated() {
        // console.log('open');
        // this.$parent.isShowLoading = false;
    },
    deactivated() {
        // console.log('closed');
        // this.$parent.isShowLoading = true;
    },
    beforeRouteLeave (to, from, next) {
        console.log(1);
        this.$parent.isShowLoading = true;
        next();
        // 在渲染该组件的对应路由被 confirm 前调用
        // 不！能！获取组件实例 `this`
        // 因为当钩子执行前，组件实例还没被创建
    }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
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

	input{
		@include inputClass;
		@include blockCenter;
		border: 2px solid lightgray;
		color: gray;
		width: 400px;
	}
	button {
	    background-color: $buttonColor;
	    color: #FFF;
	    border: 1px solid $buttonColor;
	    cursor: pointer;
	    width: 100px;
	    @include inputClass;
	    @include blockCenter;
	    &.unabled{
			cursor: not-allowed;
		}
	}
	table{
		@include blockCenter;
		width: 600px;
		th{
			background-color: $thBgColor;
			color: $thFontColor;
			padding: 2px 0;
			width: 150px;
		}
		.level1{
			color: $level1BgColor;
		}
		.level2{
			color: $level2BgColor;
		}
		.level3{
			color: $level3BgColor;
		}
		.level4{
			color: $level4BgColor;
		}
		.level5{
			color: $level5BgColor;
		}
		.level6{
			color: $level6BgColor;
		}
		tr:nth-of-type(odd){
			// background-color: #D3FFDF;
		}
		tr:nth-of-type(even){
			// background-color: #FFE9C4;
		}
		tr:hover{
			background-color: #D3FFDF;
		}
	}
	
</style>
