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
        hasSelectedCity: localStorage.city ? true : false,
        city: localStorage.city || ''
    },
    mutations: {
        updateMessage(state, message) {
            state.pw1 = message;
        },
        changeStatus(state) {
            state.isSigned = !state.isSigned;
        },
        toSignIn(state) {
            state.isSignIn = true;
        },
        toSignUp(state) {
            state.isSignUp = true;
        },
        cancelSignin(state) {
            state.userName = '';
            state.isSigned = false;
            localStorage.removeItem('userInfo');
        },
        showErr(state, args) {
        	state.isErr = true;
        	if(args){
				state.status = '用户名已存在或密码不相同';
        	}
        },
       	hideErr(state) {
            state.isErr = false;
        },
        resetStatus(state) {
            state.isSigned = false;
            state.userName = '';
            state.isSignIn = false;
            state.isSignUp = false;
            state.status = '用户名或密码错误';
            state.isErr = false;
        },
        initStatus(state) {
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
        selectCity(state) {
            state.hasSelectedCity = !state.hasSelectedCity;
        },
        setUserInfo(state, args) {
        	state.userName = args.un;
            state.isSigned = true;
            state.isSignIn = false;
			state.isSignUp = false;
        }
    },
    actions: {
        toSignIn({ commit }) {
            commit('resetStatus');
            commit('toSignIn');
        },
        toSignUp({ commit }) {
            commit('resetStatus');
            commit('toSignUp');
        },
        closePopup({ commit }) {
            commit('resetStatus');
        },
        resetStatus({ commit }) {
            commit('resetStatus');
        },
        initStatus({ commit }) {
            commit('resetStatus');
            commit('initStatus');
        },
        checkInput({ commit }, args) {
        	commit('hideErr');
        	if (!args.un || !args.pw1) {
                commit('showErr');
                return false;
            }
            switch (args.logType) {
                //登录
                case 1:
                    Vue.http.jsonp(GLOBAL_PATH.JSONP_URI + 'signin', {
                        // this.$http.post('/signin', {
                        params: {
                            un: args.un,
                            pw: args.pw1
                        }
                    }).then((res) => {
                        let data = res.data;
                        console.log(data.un)
                        // let data = JSON.parse(res.data);
                        if (data.status == 200) {
                            commit({
                            	type: 'setUserInfo',
                            	un: data.un
                        	});
                            localStorage.userInfo = JSON.stringify({
                                userName: data.un,
                                expire: new Date().getTime() + 259200000
                            });
                        } else {
                        	commit('showErr');
                        }
                    }, (err) => {
                        console.log(err);
                    });
                    break;
                    //注册
                case 2:
                    if (args.pw1 !== args.pw2) {
                        commit({
                        	type: 'showErr',
                        	text: '用户名已存在或密码不相同'
                        });
                        return false;
                    }
                    Vue.http.jsonp(GLOBAL_PATH.JSONP_URI + 'signup', {
                        // this.$http.post('/signup', {
                        params: {
                            un: args.un,
                            pw: args.pw1
                        }
                    }).then((res) => {
                        let data = res.data;
                        // let data = JSON.parse(res.data);
                        if (data.status == 200) {
                            commit({
                            	type: 'setUserInfo',
                            	un: data.un
                        	});
                            localStorage.userInfo = JSON.stringify({
                                userName: data.un,
                                expire: new Date().getTime() + 259200000
                            });
                        } else {
                            commit({
	                        	type: 'showErr',
	                        	text: '用户名已存在或密码不相同'
	                        });                        
                        }
                    }, (err) => {
                        console.log(err);
                    });
                    break;
            }
        }
    }
}
