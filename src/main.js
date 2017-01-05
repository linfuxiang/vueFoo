// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import vueRouter from 'vue-router'
import vueResource from 'vue-resource'
// import elementUI from 'element-ui'
// import 'element-ui/lib/theme-default/index.css'

Vue.use(vueResource);
Vue.use(vueRouter);
// Vue.use(elementUI);

// const Hello = require('./components/Hello.vue');
// const Index = require('./components/Index.vue');
// const Details = require('./components/Details.vue');

const routes = [{
    path: '/Hello',
    component: function(resolve){
        require(['./components/Hello'], resolve);
    }
}, {
    path: '/Index',
    component: function(resolve){
        require(['./components/Index'], resolve);
    }
}, {
    path: '/Details',
    component: function(resolve){
        require(['./components/Details'], resolve);
    }
}, {
    path: '*',
    redirect: '/Hello'
}];

const router = new vueRouter({
    routes
});

/* eslint-disable no-new */
new Vue({
    el: '#app',
    template: '<App/>',
    router,
    components: { App }
})
