// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Navi from './components/Navi'
import Hello from './components/Hello'
import vueRouter from 'vue-router'
import vueResource from 'vue-resource'

Vue.use(vueResource);
Vue.use(vueRouter);

const routes = [{
    path: '/',
    component: Hello
}, {
    path: '/hello',
    component: Hello
},{
	path: '*',
	component: Navi
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
