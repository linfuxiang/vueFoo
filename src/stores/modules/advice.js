import GLOBAL_PATH from 'static/path.js'

import VueResource from 'vue-resource'
import Vue from 'vue'

Vue.use(VueResource);

export default {
    state: {
        data: {}
    },
    mutations: {
    },
    actions: {
    	advice_getData({commit, state}) {
            if (localStorage.city) {
                Vue.http.get(GLOBAL_PATH.JSONP_URI + 'getWeather', {
                    params: {
                        'location': localStorage.city
                    },
                }).then((res) => {
                    let data = res.data;
                }, (err) => {
                    console.log(err);
                });
            }
    	}    	
    }
}
