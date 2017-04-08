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
        // city_initCity(state) {
        //     state.hasSelectedCity = localStorage.city ? true : false;
        //     state.city = localStorage.city ? localStorage.city : '';
        // },
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
        city_setCity(state, cityName) {
            state.hasSelectedCity = true;
            state.city = cityName;
            localStorage.city = cityName;
        }
    },
    actions: {
        city_showCity({ commit, state }) {
        	// sessionStorage.removeItem('cityList')
        	if(sessionStorage.cityList){
                commit('city_showDialog');
        		return ;
        	}
            commit('global_showLoading');
            Vue.http.get(GLOBAL_PATH.JSONP_URI + 'getAllCity').then((res) => {
            	commit({
            		type: 'city_setcityList',
            		cityList: res.data
            	})
                commit('city_showDialog');
                commit('global_hideLoading');
            }, (err) => {
                // console.log(err);
                commit('global_hideLoading');
            });
        },
        city_initCity({dispatch, commit}) {
            if(!sessionStorage.cityList){
                Vue.http.get(GLOBAL_PATH.JSONP_URI + 'getAllCity').then((res) => {
                    commit({
                        type: 'city_setcityList',
                        cityList: res.data
                    })
                }, (err) => {
                });
            }
            
            if(localStorage.city){
                commit('city_setCity', localStorage.city);
                dispatch('advice_getData');
                return ;
            }
            // 百度地图API功能
            // var map = new BMap.Map("allmap");
            var point = new BMap.Point(116.331398, 39.897445);
            // map.centerAndZoom(point, 12);
            function myFun(result) {
                var cityName = result.name.replace(/['市'|'县']/,()=>{
                    return '';
                });
                // map.setCenter(cityName);
                console.log(cityName);
                if(cityName == '全国'){
                    return ;
                }
                localStorage.city = cityName;
                commit('city_setCity', cityName);
                dispatch('advice_getData');
            }
            var myCity = new BMap.LocalCity();
            myCity.get(myFun);
        }
    }
}
