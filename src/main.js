// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
// import VueResource from 'vue-resource'
import store from './store/index'
// import elementUI from 'element-ui'
// import 'element-ui/lib/theme-default/index.css'

// Vue.use(VueResource);
Vue.use(VueRouter);
// Vue.use(elementUI);

// const Hello = require('./components/Hello.vue');
// const Charts = require('./components/Charts.vue');
// const Details = require('./components/Details.vue');

const routes = [{
    path: '/Hello',
    component: function(resolve) {
        require(['./components/Hello'], resolve);
    }
}, {
    path: '/Charts',
    component: function(resolve) {
        require(['./components/Charts'], resolve);
    }
}, {
    path: '/Details',
    component: function(resolve) {
        require(['./components/Details'], resolve);
    }
}, {
    path: '*',
    redirect: '/Hello'
}];

const router = new VueRouter({
    routes
});

/* eslint-disable no-new */
new Vue({
    el: '#app',
    template: '<App/>',
    router,
    store,
    components: { App }
})
