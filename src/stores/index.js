// import 'babel-polyfill'
import Vue from 'vue'
import Vuex from 'vuex'
import hello from './modules/hello'
import charts from './modules/charts'
import navi from './modules/navi'
import user from './modules/user'
import city from './modules/city'
import details from './modules/details'

Vue.use(Vuex)

export default new Vuex.Store({
    strict: process.env.NODE_ENV !== 'production',
    state: {
        isMobile: false,
        isShowLoading: true
    },
    mutations: {
        global_setMobile(state, bool) {
        	state.isMobile = bool;
        },
        global_showLoading(state) {
        	state.isShowLoading = true;
        },
        global_hideLoading(state) {
            state.isShowLoading = false;
        },
    },
    modules: {
        hello,
    	charts,
    	navi,
        user,
        city,
        details
    }

})
