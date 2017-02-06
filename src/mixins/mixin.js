// import { mapMutations } from 'vuex'
// import { Loading } from 'element-ui'
export default {
	data() {
		return {
			// loading: null
		}
	},
	methods: {
        // ...mapMutations(['global_showLoading', 'global_hideLoading']),
    },
	mounted() {
		// this.global_hideLoading();
		// this.loading = Loading.service({ fullscreen: true })
		// console.log(Loading)
	},
	beforeDestroy() {
		// this.global_showLoading();
		// this.loading.close();
	},
	beforeRouteLeave (to, from, next) {
        // this.global_showLoading();
        // this.loading.close();
        next();
        // 在渲染该组件的对应路由被 confirm 前调用
        // 不！能！获取组件实例 `this`
        // 因为当钩子执行前，组件实例还没被创建
    }
}