<template>
    <div class="hello">
        <h1>{{ title }}</h1>
    </div>
</template>
<script>
import { mapState } from 'vuex'
// import { mapMutations } from 'vuex'

export default {
    data() {
        return {
            // title: 'a'
        }
    },
    computed: {
        ...mapState({
            title: state => state.hello.title,
        })
    },
    // methods: {
    //     ...mapMutations(['global_showLoading', 'global_hideLoading']),
    // },
    mounted() {
        this.$message('这是一条消息提示');
    },
    activated() {
    },
    deactivated() {
    },
    // beforeRouteLeave (to, from, next) {
    //     this.global_showLoading();
    //     next();
    //     // 在渲染该组件的对应路由被 confirm 前调用
    //     // 不！能！获取组件实例 `this`
    //     // 因为当钩子执行前，组件实例还没被创建
    // }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h1,
h2 {
    font-weight: normal;
}
</style>
