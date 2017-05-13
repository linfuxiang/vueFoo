<template>
    <div class="city">
        <!-- <div>默认城市：{{ city }}</div> -->
        <div v-show="hasSelectedCity">默认地区：{{city}}<el-button type="text" @click="city_selectCity">[重选]</el-button></div>
        <div v-show="!hasSelectedCity" class="citySelect">
        <!-- @mouseenter="city_checkInput"@click="city_checkInput"  -->
        	<el-button type="text" @click="city_showCity">[选择地区]</el-button>
        	<!-- <div class="cityList"> -->
	    		<!-- <ul>
	    			<li v-for="item in cityList" @click="city_selectCity($event)">{{ item }}</li>
	    		</ul> -->
	    		<!-- <i @click="city_togglecityModal">×</i> -->
	    		<!-- <el-button type="text" >打开嵌套表单的 Dialog</el-button> -->
    		<el-dialog title="选择城市" v-model="dialogVisible" @close="city_hideDialog" custom-class="dialog" :modal-append-to-body="false">
				<el-button v-for="item in cityList" type="text" @click="city_selectCity($event)">{{ item }}</el-button>
			</el-dialog>	
	    	<!-- </div> -->
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
	        dialogVisible: state => state.city.dialogVisible,
    	})
    },
    methods: {
    	...mapMutations(['city_toggleselectCity', 'city_selectCity', 'city_showDialog', 'city_hideDialog']),
        ...mapActions(['city_showCity', 'city_initCity']),
    },
    mounted() {
        this.city_initCity();
	}
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
	.city{
		.citySelect{
			&:hover{
				// .cityList{
				// 	display: block;
				// }
			}

		}
		.cityList{
			display: none;
			position: absolute;
			margin: 0 auto;
			// width: 50%;
		    z-index: 999;
			padding: 20px 0 20px 30px;
		    right: 0;
    		width: 500px;
		    background-color: lightblue;
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
</style>
<style>
	.dialog {
		width: 900px;
	}
</style>