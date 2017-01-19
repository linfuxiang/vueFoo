import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [{
    name: 'hello',
    path: '/Hello',
    component: function(resolve) {
        require(['./components/Hello'], resolve);
    }
}, {
    name: 'charts',
    path: '/Charts',
    component: function(resolve) {
        require(['./components/Charts'], resolve);
    }
}, {
    name: 'details',
    path: '/Details',
    component: function(resolve) {
        require(['./components/Details'], resolve);
    }
}, {
    path: '*',
    redirect: '/Hello'
}];

export default new VueRouter({
    routes
});