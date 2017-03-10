import { mapMutations } from 'vuex'
// import { Loading } from 'element-ui'
export default {
	data() {
		return {
			// loading: null
		}
	},
	methods: {
        ...mapMutations(['global_showLoading', 'global_hideLoading']),
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
        next();
        // 导航离开该组件的对应路由时调用
    	// 可以访问组件实例 `this`
    },
}