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
    filters: {
        timeFormatter(d) {
            let date;
            if(typeof date != 'object') {
                date = new Date(+d);
            } else {
                date = d;
            }
        	return `${date.getFullYear()}年${date.getMonth()+1}月${date.getDate()}日 ${date.getHours()<10?'0'+date.getHours():date.getHours()}:${date.getMinutes()<10?'0'+date.getMinutes():date.getMinutes()}:${date.getSeconds()<10?'0'+date.getSeconds():date.getSeconds()}`;
        },
        MDformatter(date) {
        	let dateArr = date.split('-');
        	if(new Date().getDate() == dateArr[2]) {
        		return '今天';
        	}
        	return `${+dateArr[1]}月${+dateArr[2]}日`;
        }
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