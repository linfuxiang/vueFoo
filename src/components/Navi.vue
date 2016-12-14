<template>
  	<div class="nav">
    	<ul>
    		<li v-for="item in navLists" track-by="$index" @click="toAjax">{{item}}</li>
    	</ul>
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
	ul{
		position: fixed;
	    background: rgba(45,45,45,0.5);
	    padding: 0px;
	}
	li{
		font-weight: bold;
		color: white;
		cursor: pointer;
		padding: 10px;
	}
	li:hover{
		background: white;
		color: black;
	}
</style>
