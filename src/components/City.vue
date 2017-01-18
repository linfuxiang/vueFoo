<template>
    <div class="city">
        <!-- <div>默认城市：{{ city }}</div> -->
        <div v-show="hasSelectedCity">默认城市：{{city}}<span @click="city_selectCity">[重选]</span></div>
        <div v-show="!hasSelectedCity" class="citySelect"@mouseenter="city_checkInput">
        <!-- @mouseenter="city_checkInput" -->
        	<div class="cityBtn">[选择城市]</div>
        	<div class="cityList">
	    		<ul>
	    			<li v-for="item in cityList" @click="city_selectCity($event)">{{ item }}</li>
	    		</ul>
	    		<!-- <i @click="city_togglecityModal">×</i> -->
	    	</div>
        </div>
    </div>
</template>
<script>
import { mapState } from 'vuex'
import { mapMutations } from 'vuex'
import { mapActions } from 'vuex'

export default {
    data() {
        return {
        	
        }
    },
    computed: {
    	...mapState({
    		hasSelectedCity: state => state.city.hasSelectedCity,
	        city: state => state.city.city,
	        showcity: state => state.city.showcity,
	        cityList: state => state.city.cityList,
    	})
    },
    methods: {
    	...mapMutations(['city_selectCity', 'city_togglecityModal', 'city_selectCity']),
        ...mapActions(['city_checkInput']),
    },
    mounted() {
	}
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
	$color: lightblue;
	.city{
		.citySelect{
			&:hover{
				.cityList{
					display: block;
				}
			}
		}
		.cityList{
			display: none;
			position: absolute;
			margin: 0 auto;
			// width: 50%;
			padding: 20px 0 20px 30px;
		    right: 0;
    		width: 500px;
		    background-color: $color;
			ul{
				height: 350px;
				overflow-y: auto;
				li{
				    float: left;
			    	margin: 0 5px;
			    	&:hover{
			    		background: white;
			    		cursor: pointer;
			    	}
				}
			}
			i{
			    position: absolute;
			    font-style: normal;
			    left: 0;
			    top: 0;
			    cursor: pointer;
			    color: #333;
			}
		}
	}
	::-webkit-scrollbar  
	{  
	    width: 8px;
	    background-color: $color;  
	}  
	  
	/*定义滚动条轨道 内阴影+圆角*/  
	::-webkit-scrollbar-track  
	{  
	    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);  
	    border-radius: 10px;  
	    background-color: #F5F5F5;  
	}  
	  
	/*定义滑块 内阴影+圆角*/  
	::-webkit-scrollbar-thumb  
	{  
	    border-radius: 10px;  
	    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);  
	    background-color: #555;  
	}  
</style>
