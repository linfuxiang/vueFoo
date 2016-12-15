<template>
    <div class="nav">
        <ul>
            <li v-for="item in navLists" track-by="$index" @click="toAjax">
                <router-link :to="'/' + item.linkName">{{item.linkName}}</router-link>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    name: 'nav',
    data() {
        return {
            navLists: [{
                linkName: 'Hello'
            }, {
                linkName: 'Index'
            }]
        }
    },
    methods: {
        toAjax() {
            // console.log(this.$http.get)
            // this.$http.get('a.json')
        }
    }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
ul {
    position: fixed;
    background: rgba(45, 45, 45, 0.5);
    padding: 0px;
}

a {
    font-weight: bold;
    color: white;
    cursor: pointer;
    display: block;
    padding: 10px;
}

a:hover {
    background: white;
    color: black;
}

a {
    color: white;
    text-decoration: none;
}
</style>
