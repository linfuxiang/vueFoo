import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

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

export default new VueRouter({
    routes
});