import GLOBAL_PATH from 'static/path.js'
import VueResource from 'vue-resource'
import Vue from 'vue'

Vue.use(VueResource);

export default {
    state: {
        header: '实时空气质量指数(AQI)监测',
        jsonData: [],
        showWhichComponent: ''
    },
    mutations: {
    },
    actions: {
    	advice_getData({commit, state}) {
            if(state.jsonData.length > 0){
                commit('global_hideLoading');
                commit('charts_initComponent');
                return ;
            }
            // Vue.http.jsonp(GLOBAL_PATH.JSONP_URI + 'getData', {
			Vue.http.get(GLOBAL_PATH.JSONP_URI + 'getData', {
			    params: {
			        'reqCollection': 'latest',
			        'reqArea': ''
			    }
			}).then((res) => {
                let data = res.data;
                // let data = JSON.parse(res.data);
			    commit({
			    	type: 'charts_changeData',
			    	data: data.data
			    });
			    commit('global_hideLoading');
                commit('charts_initComponent');
			}, (err) => {
			    console.log(err);
			    commit('global_hideLoading');
			});
    	}    	
    }
}
