import GLOBAL_PATH from 'static/path.js'
import VueResource from 'vue-resource'
import Vue from 'vue'

Vue.use(VueResource);
export default {
    state: {
        isSigned: false,
        userName: '',
        isSignIn: false,
        isSignUp: false,
        status: '用户名或密码错误',
        isErr: false,
        un: '',
        pw1: '',
        pw2: '',
    },
    mutations: {
        user_updateMessage(state, message) {
            state.pw1 = message;
        },
        user_changeStatus(state) {
            state.isSigned = !state.isSigned;
        },
        user_toSignIn(state) {
            state.isSignIn = true;
        },
        user_toSignUp(state) {
            state.isSignUp = true;
        },
        user_closeSignUp(state) {
            state.un = '';
            state.pw1 = '';
            state.pw2 = '';
            state.isSignUp = false;
            state.status = '用户名或密码错误';
            state.isErr = false;
        },
        user_closeSignIn(state) {
            state.un = '';
            state.pw1 = '';
            state.isSignIn = false;
            state.status = '用户名或密码错误';
            state.isErr = false;
        },
        user_cancelSignin(state) {
            state.userName = '';
            state.isSigned = false;
            localStorage.removeItem('userInfo');
        },
        user_showErr(state, args) {
        	state.isErr = true;
        	if(args){
				state.status = '用户名已存在或密码不相同';
        	}
        },
       	user_hideErr(state) {
            state.isErr = false;
        },
        user_resetStatus(state) {
        	state.un = '';
        	state.pw1 = '';
        	state.pw2 = '';
            state.isSigned = false;
            state.userName = '';
            state.isSignIn = false;
            state.isSignUp = false;
            state.status = '用户名或密码错误';
            state.isErr = false;
        },
        user_initStatus(state) {
            if (localStorage.userInfo != undefined) {
                let userInfo = JSON.parse(localStorage.userInfo),
                    expire = (new Date()).getTime();
                if (userInfo.userName && (userInfo.expire - expire >= 0)) {
                    state.userName = userInfo.userName;
                    state.isSigned = true;
                } else {
                    state.isSigned = false;
                    state.userName = '';
                    localStorage.removeItem('userInfo');
                }
            }
        },
        user_setUserInfo(state, args) {
        	state.userName = args.un;
            state.isSigned = true;
            state.isSignIn = false;
			state.isSignUp = false;
        },
        user_update_un(state, val) {
        	state.un = val
        },
        user_update_pw1(state, val) {
        	state.pw1 = val
        },
        user_update_pw2(state, val) {
        	state.pw2 = val
        }
    },
    actions: {
        user_toSignIn({ commit }) {
            commit('user_resetStatus');
            commit('user_toSignIn');
        },
        user_toSignUp({ commit }) {
            commit('user_resetStatus');
            commit('user_toSignUp');
        },
        user_closePopup({ commit }) {
            commit('user_resetStatus');
        },
        user_resetStatus({ commit }) {
            commit('user_resetStatus');
        },
        user_initStatus({ commit }) {
            commit('user_resetStatus');
            commit('user_initStatus');
        },
        user_checkInput({ commit, state }, logType) {
        	commit('user_hideErr');
        	if (!state.un || !state.pw1) {
                commit('user_showErr');
                return false;
            }
            commit('global_showLoading');
            switch (logType) {
                //登录
                case 1:
                    // Vue.http.jsonp(GLOBAL_PATH.JSONP_URI + 'signin', {
                    Vue.http.post(GLOBAL_PATH.JSONP_URI + 'signin', {
                        // params: {
                            un: state.un,
                            pw: state.pw1
                        // }
                    }).then((res) => {
                        let data = res.data;
                        // let data = JSON.parse(res.data);
                        if (data.status == 200) {
                            commit({
                            	type: 'user_setUserInfo',
                            	un: data.un
                        	});
                            localStorage.userInfo = JSON.stringify({
                                userName: data.un,
                                expire: new Date().getTime() + 259200000
                            });
                        } else {
                        	commit('user_showErr');
                        }
                        commit('global_hideLoading');
                    }, (err) => {
                        console.log(err);
                        commit('global_hideLoading');
                    });
                    break;
                    //注册
                case 2:
                    if (state.pw1 !== state.pw2) {
                        commit({
                        	type: 'user_showErr',
                        	text: '用户名已存在或密码不相同'
                        });
                        commit('global_hideLoading');
                        return false;
                    }
                    // Vue.http.jsonp(GLOBAL_PATH.JSONP_URI + 'signup', {
                    Vue.http.post(GLOBAL_PATH.JSONP_URI + 'signup', {
                        // params: {
                            un: state.un,
                            pw: state.pw1
                        // }
                    }).then((res) => {
                        let data = res.data;
                        // let data = JSON.parse(res.data);
                        if (data.status == 200) {
                            commit({
                            	type: 'user_setUserInfo',
                            	un: data.un
                        	});
                            localStorage.userInfo = JSON.stringify({
                                userName: data.un,
                                expire: new Date().getTime() + 259200000
                            });
                        } else {
                            commit({
	                        	type: 'user_showErr',
	                        	text: '用户名已存在或密码不相同'
	                        });                        
                        }
                        commit('global_hideLoading');
                    }, (err) => {
                        console.log(err);
                        commit('global_hideLoading');
                    });
                    break;
            }
        }
    }
}
