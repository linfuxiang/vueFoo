<template>
  	<div class="index">
    	这里才是首页
  	</div>
</template>

<script>
export default {
  	name: 'nav',
  	data () {
    	return {
      	navLists: ['Index', 'Vue', 'About Me']
    	}
  	},
  	methods : {
		toAjax(){
			// console.log(this.$http.get)
			this.$http.get('a.json')
		}
  	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	
</style>
