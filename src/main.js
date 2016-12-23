// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Hello from './components/Hello'
import Index from './components/Index'
import Details from './components/Details'
import User from './components/User'
import vueRouter from 'vue-router'
import vueResource from 'vue-resource'

Vue.use(vueResource);
Vue.use(vueRouter);

const routes = [{
    path: '/Hello',
    component: Hello
}, {
    path: '/Index',
    component: Index
}, {
    path: '/Details',
    component: Details
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
