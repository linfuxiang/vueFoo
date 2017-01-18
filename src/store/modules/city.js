import GLOBAL_PATH from 'static/path.js'
import VueResource from 'vue-resource'
import Vue from 'vue'

Vue.use(VueResource);

export default {
    state: {
    	hasSelectedCity: localStorage.city ? true : false,
        city: localStorage.city || '',
        showcity: false,
        cityList: sessionStorage.cityList ?  sessionStorage.cityList.split(',') : []
    },
    mutations: {
        city_toggleselectCity(state) {
            state.hasSelectedCity = !state.hasSelectedCity;
        },
        city_togglecityModal(state) {
            state.showcity = !state.showcity;
        },
        city_setcityList(state, args) {
        	state.cityList = args.cityList;
        	sessionStorage.cityList = args.cityList;
        },
        city_selectCity(state, args) {
        	// console.log(args);
        	state.city = args.target.innerText;
        	state.hasSelectedCity = !state.hasSelectedCity;
        }
    },
    actions: {
        city_checkInput({ commit, state }) {
        	// sessionStorage.removeItem('cityList')
        	commit('city_togglecityModal');
        	if(sessionStorage.cityList){
        		return ;
        	}
            commit('global_toggleLoading');
            Vue.http.jsonp(GLOBAL_PATH.JSONP_URI + 'getAllCity').then((res) => {
            	console.log(res.data)
            	commit({
            		type: 'city_setcityList',
            		cityList: res.data
            	})
                commit('global_toggleLoading');
            }, (err) => {
                // console.log(err);
                commit('global_toggleLoading');
            });
        }
    }
}
