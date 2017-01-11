<template>
    <div class="hello">
        <h1>{{ msg }}</h1>
    </div>
</template>
<script>


export default {
    data() {
        return {
            msg: 'Welcome to Air Quality Monitoring Platform'
        }
    },
    props:[
        'isShowLoading'
    ],
    mounted() {
        // console.log('open');
        this.$parent.isShowLoading = false;
    },
    activated() {
        // console.log('open');
        // this.$parent.isShowLoading = false;
    },
    deactivated() {
        // console.log('closed');
        // this.$parent.isShowLoading = true;
    },
    beforeRouteLeave (to, from, next) {
        this.$parent.isShowLoading = true;
        next();
        // 在渲染该组件的对应路由被 confirm 前调用
        // 不！能！获取组件实例 `this`
        // 因为当钩子执行前，组件实例还没被创建
    }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h1,
h2 {
    font-weight: normal;
}
</style>
