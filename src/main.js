// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// 引入模块依赖
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/index'
import { sync } from 'vuex-router-sync'
// import VueResource from 'vue-resource'
// import elementUI from 'element-ui'
// import 'element-ui/lib/theme-default/index.css'
import { mapMutations } from 'vuex'
// Vue.use(VueResource);
// Vue.use(elementUI);

// 配置vuex-router-sync
sync(store, router)

Vue.mixin({
	methods: {
        ...mapMutations(['global_showLoading', 'global_hideLoading']),
    },
	mounted() {
		this.global_hideLoading();
	},
	beforeDestroy() {
		this.global_showLoading();
	},
	beforeRouteLeave (to, from, next) {
        this.global_showLoading();
        next();
        // 在渲染该组件的对应路由被 confirm 前调用
        // 不！能！获取组件实例 `this`
        // 因为当钩子执行前，组件实例还没被创建
    }
})
/* eslint-disable no-new */
new Vue(Vue.util.extend({
    el: '#app',
    template: '<App/>',
    router,
    store,
    components: { App }
}))
