// import 'babel-polyfill'
import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'

Vue.use(Vuex)

export default new Vuex.Store({
	strict: process.env.NODE_ENV !== 'production',
    state: {
        count: 2
    },
    mutations: {
        increment(state) {
            state.count++
        }
    },
    modules: {
    	user
    }
})