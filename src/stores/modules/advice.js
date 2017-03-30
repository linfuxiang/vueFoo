import GLOBAL_PATH from 'static/path.js'

import VueResource from 'vue-resource'
import Vue from 'vue'

Vue.use(VueResource);

export default {
    state: {
        canShow: false,
        now: {},
        daily: {},
        location: {},
        suggestion: {}
    },
    mutations: {
        advice_setData(state, data) {
            state.now = data.now;
            state.daily = data.daily.daily;
            state.location = data.daily.location;
            state.suggestion = data.suggestion.suggestion;
            state.canShow = true;
        }
    },
    actions: {
    	advice_getData({commit, state}) {
            if (localStorage.city) {
                Vue.http.get(GLOBAL_PATH.JSONP_URI + 'getWeather', {
                    params: {
                        'location': localStorage.city
                    },
                }).then((res) => {
                    commit('advice_setData', res.data)
                }, (err) => {
                    console.log(err);
                });
            }
    	}    	
    }
}
