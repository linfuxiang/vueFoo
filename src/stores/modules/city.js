import GLOBAL_PATH from 'static/path.js'
import VueResource from 'vue-resource'
import Vue from 'vue'

Vue.use(VueResource);

export default {
    state: {
        dialogVisible: false,
    	hasSelectedCity: false,
        city: '',
        showcity: false,
        cityList: sessionStorage.cityList ?  sessionStorage.cityList.split(',') : []
    },
    mutations: {
        city_initCity(state) {
            state.hasSelectedCity = localStorage.city ? true : false;
            state.city = localStorage.city ? localStorage.city : '';
        },
        city_toggleselectCity(state) {
            state.hasSelectedCity = !state.hasSelectedCity;
        },
        city_setcityList(state, args) {
        	state.cityList = args.cityList;
        	sessionStorage.cityList = args.cityList;
        },
        city_selectCity(state, args) {
            state.dialogVisible = false;
            state.hasSelectedCity = !state.hasSelectedCity;
            if(args.target.innerText == '[重选]'){
                localStorage.removeItem('city');
                return;
            }
        	state.city = args.target.innerText;
        	localStorage.city = state.city;
        },
        city_showDialog(state) {
            state.dialogVisible = true;
        },
        city_hideDialog(state) {
            state.dialogVisible = false;
        },
    },
    actions: {
        city_checkInput({ commit, state }) {
        	// sessionStorage.removeItem('cityList')
        	if(sessionStorage.cityList){
        		return ;
        	}
            commit('global_showLoading');
            Vue.http.jsonp(GLOBAL_PATH.JSONP_URI + 'getAllCity').then((res) => {
            	commit({
            		type: 'city_setcityList',
            		cityList: res.data
            	})
                commit('global_hideLoading');
            }, (err) => {
                // console.log(err);
                commit('global_hideLoading');
            });
        }
    }
}
