<template>
    <div class="index">
        <header>{{header}}</header>
        <top :jsonData="jsonData" keep-alive></top>
    </div>
</template>
<script>
import top from './Top'
// import geo from './Geo'

export default {
    data() {
        return {
            header: '数读PM2.5',
            jsonData: [],
            apiUrl: 'http://superlfx.cn:10011'
        }
    },
    components: {
        top
    },
    methods: {
    },
    mounted() {
        console.log(this.$route.query.last);
        this.$http.jsonp(this.apiUrl).then((res) => {
            this.jsonData = res.data;
        }, (err) => {
            console.log(err);
        });
    }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
