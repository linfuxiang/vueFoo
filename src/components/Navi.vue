<template>
    <div class="nav">
        <!-- <ul>
            <li v-for="item in navLists">
                <router-link active-class="active" :to="{path:'/' + item.link,query:{last: item.link}}">{{item.linkName}}</router-link>
                <router-link active-class="active" :to="{path:'/' + item.link}">{{item.linkName}}</router-link>
            </li>
        </ul> -->
        <!-- <el-menu theme="dark" :default-active="active" class="el-menu-demo" mode="horizontal" router @select="changeRoutes">
            <template v-for="item in navLists">
                <el-menu-item :index="'/' + item.link" v-on:click.native="foo">{{item.linkName}}</el-menu-item>
            </template>  
        </el-menu> -->

        <el-menu :default-active="idx" class="container el-menu-demo" mode="horizontal" router>
            <template v-for="item in navLists">
                <el-menu-item :index="'/' + item.link" >{{item.linkName}}</el-menu-item>
            </template>
            <!-- <el-menu-item index="1">处理中心</el-menu-item>
            <el-submenu index="2">
                <template slot="title">我的工作台</template>
                <el-menu-item index="2-1">选项1</el-menu-item>
                <el-menu-item index="2-2">选项2</el-menu-item>
                <el-menu-item index="2-3">选项3</el-menu-item>
            </el-submenu>
            <el-menu-item index="3"><a href="https://www.ele.me" target="_blank">订单管理</a></el-menu-item> -->
        </el-menu>
    </div>
</template>
<script>
import { mapState } from 'vuex'

export default {
    data() {
        return {
        }
    },
    computed: {
        ...mapState({
            navLists: state => state.navi.navLists,
            idx: state => state.route.path,
        })
    },
    methods: {
    },
    mounted() {
        // console.log(this.store)
    }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
/**
 * 导航栏CSS属性设置
 * @type {[type]}
 */
$bgColor: #d0ebff;
$fontColor: #4c4c4c;
$activeFontColor: #3466bb;
$activeBgColor: #ecf7ff;

$navPositionTop: -30px;

$transitionTime: all 0.5s;

.nav {
    background-color: #eef1f6;
}
// @mixin setActiveColor{
// 	background: $activeBgColor;
// 	color: $activeFontColor;
// }

// ul.aa {
//     // position: fixed;
//     left: 0px;
//     top: $navPositionTop;
//     background: $bgColor;
//     transition: $transitionTime;
//     z-index: 999;
//     li{
//     	display: inline-block;
//     }
//     a {
// 	    font-weight: bold;
// 	    color: $fontColor;
// 	    cursor: pointer;
// 	    display: block;
// 	    padding: 10px;
//         font-size: 20px;
//         line-height: 20px;
// 	    transition: $transitionTime;
// 	    &:hover {
// 		    @include setActiveColor;
// 		}
// 	}
// 	&:hover{
// 		top: 0px;
// 	}
// }

// .active{
// 	@include setActiveColor;
// 	cursor: default;
// }

@media screen and (max-width: 768px) {
	
}
</style>
