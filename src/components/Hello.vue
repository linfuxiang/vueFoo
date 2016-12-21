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
    mounted() {
        console.log(this.$route.query.last);
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
