import { mapMutations } from 'vuex'
export default {
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
}