<template>
    <div class="nav">
        <ul>
            <li v-for="item in navLists" @click="toAjax">
                <!-- <router-link active-class="active" :to="{path:'/' + item.link,query:{last: item.link}}">{{item.linkName}}</router-link> -->
                <router-link active-class="active" :to="{path:'/' + item.link}" @click.native="foo">{{item.linkName}}</router-link>
            </li>
        </ul>
        <!-- <el-menu theme="dark" :default-active="active" class="el-menu-demo" mode="horizontal" router @select="changeRoutes">
            <template v-for="item in navLists">
                <el-menu-item :index="'/' + item.link" v-on:click.native="foo">{{item.linkName}}</el-menu-item>
            </template>  
        </el-menu> -->

    </div>
</template>
<script>
export default {
    data() {
        return {
            // active: '',
            navLists: [{
                linkName: '欢迎页',
                link: 'Hello'
            }, {
                linkName: '首页',
                link: 'Index'
            }, {
                linkName: '详细数据',
                link: 'details'
            }],
            set: new Set()
        }
    },
    methods: {
        toAjax() {
            // console.log(this.$http.get)
        },
        changeRoutes() {
            // this.$parent.isShowLoading = true;
            // console.log(1);
        },
        foo() {
            // if([...this.set].includes(this.$route.path)){

            // } else {
            //     this.$parent.isShowLoading = true;
            //     this.set.add(this.$route.path);
            // }
            // console.log('click');
        }
    },
    mounted() {
        // this.set = new Set();
        this.$watch('$route.path', function (newVal, oldVal) {
            // this.$parent.isShowLoading = false;
            // let path = this.$route.path;
            // this.active = path;
            // if([...this.set].includes(path)){
            //     this.$parent.needShowLoading = false;
            //     console.log('ok');
            // } else {
            //     this.$parent.needShowLoading = true;
            //     console.log('no');
            //     this.set.add(path);
            // }
        });
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

@mixin setActiveColor{
	background: $activeBgColor;
	color: $activeFontColor;
}

ul {
    position: fixed;
    left: 0px;
    top: $navPositionTop;
    background: $bgColor;
    transition: $transitionTime;
    z-index: 999;
    li{
    	display: inline-block;
    }
    a {
	    font-weight: bold;
	    color: $fontColor;
	    cursor: pointer;
	    display: block;
	    padding: 10px;
        font-size: 20px;
        line-height: 20px;
	    transition: $transitionTime;
	    &:hover {
		    @include setActiveColor;
		}
	}
	&:hover{
		top: 0px;
	}
}

.active{
	@include setActiveColor;
	cursor: default;
}

@media screen and (max-width: 768px) {
	
}
</style>
