<template>
    <div class="index">
        这里才是首页
        <button @click="toAjax">请求数据</button>
        <ul><li v-for="item in jsonData">{{item.name}}</li></ul>
    </div>
</template>
<script>
// import data1 from 'assets/static/data/a.json';

export default {
    name: 'nav',
    data() {
        return {
            navLists: ['Index', 'Vue', 'About Me'],
            jsonData: []
        }
    },
    methods: {
        toAjax() {
            let self = this;
	    	this.$http.get('static/data/a.json').then((res) => {
	    		self.jsonData = self.jsonData.concat(res.data.sites);
	    	}, (res) => {
	    		console.log(res);
	    	});
        }
    },
    mounted: function(){

    }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
