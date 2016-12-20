<template>
    <div class="index">
        <header>{{header}}</header>
        <top :jsonData="jsonData" keep-alive></top>
        <geo :jsonData="jsonData" keep-alive></geo>
    </div>
</template>
<script>
import top from './Top'
import geo from './Geo'

export default {
    data() {
        return {
            header: '实时PM2.5监测',
            jsonData: [],
            apiUrl: 'http://superlfx.cn:10011'
        }
    },
    components: {
        top,
        geo
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
