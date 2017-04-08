import GLOBAL_PATH from 'static/path.js'

import VueResource from 'vue-resource'
import { Message } from 'element-ui';
import Vue from 'vue'

Vue.use(VueResource);

export default {
    state: {
        title: 'Welcome to Air Quality Monitoring Platform',
        discussionLists: [],
        input: ''
    },
    mutations: {
    	hello_setDis(state, data) {
    		state.discussionLists = data;
    	},
    	hello_update_list(state, data) {
    		state.discussionLists.unshift(data);
    		state.input = '';
    	},
    	hello_update_input(state, data) {
    		state.input = data;
    	},
    },
    actions: {
    	hello_getData({commit, state}) {
            Vue.http.post(GLOBAL_PATH.JSONP_URI + 'discussion', {
            	submit: false
            }).then((res) => {
                commit('hello_setDis', res.data);
                // console.log(res.data);
            }, (err) => {
                console.log(err);
            });
        },
        hello_submit({commit, rootState, state}) {
        	let user = rootState.user.userName,
        		area = rootState.city.city,
        		content = state.input,
        		timestamp = new Date().getTime();
        	Vue.http.post(GLOBAL_PATH.JSONP_URI + 'discussion', {
				submit: true,
				user,
				area,
				content,
				timestamp
        	}).then((res) => {
                // commit('hello_setDis', res.data);
                // console.log(res.data);
                if(res.data.status == 200) {
                	commit('hello_update_list', {
                		user,
                		area,
                		timestamp,
                		content
                	});
					Message.success('提交成功');
                } else {
					Message.error('提交失败');
                }
            }, (err) => {
                console.log(err);
                Message.error('提交失败');
            });
        }
    }
}
