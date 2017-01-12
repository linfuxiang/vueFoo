import GLOBAL_PATH from 'static/path.js'
import VueResource from 'vue-resource'
import Vue from 'vue'

Vue.use(VueResource);

export default {
    state: {
        header: '实时空气质量指数(AQI)监测',
        jsonData: [],
        showWhichComponent: 'top'
    },
    mutations: {
    	charts_change(state) {
            if(state.showWhichComponent == 'top'){
                state.showWhichComponent = 'geo';
            } else {
                state.showWhichComponent = 'top';
            }
        },
        charts_changeData(state, args) {
        	state.jsonData = args.data;
        }
    },
    actions: {
    	charts_getData({commit}) {
			Vue.http.jsonp(GLOBAL_PATH.JSONP_URI + 'getData', {
			    params: {
			        'reqCollection': 'latest',
			        'reqArea': ''
			    }
			}).then((res) => {
			    commit({
			    	type: 'charts_changeData',
			    	data: res.data.data
			    });
			    commit('toggleLoading');
			}, (err) => {
			    console.log(err);
			    commit('toggleLoading');
			});
    	}    	
    }
}
