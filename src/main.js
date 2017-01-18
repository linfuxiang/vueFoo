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

// Vue.use(VueResource);
// Vue.use(elementUI);

// 配置vuex-router-sync
sync(store, router)

/* eslint-disable no-new */
new Vue(Vue.util.extend({
    el: '#app',
    template: '<App/>',
    router,
    store,
    components: { App }
}))
