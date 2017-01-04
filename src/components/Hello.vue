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
        // this.$parent.isShowLoading = false;
    },
    activated() {
        // console.log('open');
        // this.$parent.isShowLoading = false;
    },
    deactivated() {
        // console.log('closed');
        // this.$parent.isShowLoading = true;
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
