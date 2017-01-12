<template>
    <div class="user">
        <div class="userInfo">
            <div class="sign" v-if="!isSigned">
                <a href="" @click.prevent="user_toSignIn">登录</a>
                <span>/</span>
                <a href="" @click.prevent="user_toSignUp">注册</a>
            </div>
            <div class="signed" v-else>
                <span>用户：{{userName}}</span>
                <a href="" @click.prevent="user_cancelSignin">登出</a>
            </div>
            <div v-show="hasSelectedCity">默认城市：{{city}}<span @click="user_selectCity">[重选]</span></div>
            <div v-show="!hasSelectedCity" @click="user_selectCity">[选择城市]</div>
        </div>
    	
        <div class="b_signin" v-if="isSignIn">
            <i @click="user_closePopup">×</i>
            <h2>登录</h2>
            <label for="un">用户名</label>
            <input name="un" type="text" v-model.trim="un">
            <label for="pw">密码</label>
            <input name="pw" type="password" v-model.trim="pw1">
            <div v-show="isErr">{{status}}</div>
            <input type="button" value="登录" @click="user_checkInput(1)">
            <div>
                <a href="" @click.prevent="user_toSignUp">没有账号，去注册</a>
            </div>
        </div>
        <div class="b_signup" v-if="isSignUp">
        	<i @click="user_closePopup">×</i>
        	<h2>注册</h2>
        	<label for="un">用户名</label>
        	<input name="un" type="text" v-model.trim="un">
        	<label for="pw1">密码</label>
        	<input name="pw1" type="password" v-model.trim="pw1">
        	<label for="pw2">确认密码</label>
        	<input name="pw2" type="password" v-model.trim="pw2">
        	<div v-show="isErr">{{status}}</div>
        	<input type="button" value="注册" @click="user_checkInput(2)">
        	<div>
        		<a href="" @click.prevent="user_toSignIn">已有账号，去登录</a>
        	</div>
        </div>
        <div class="b_city" v-if="">
            <div></div>
        </div>
    </div>
</template>
<script>
import { mapState } from 'vuex'
import { mapMutations } from 'vuex'
import { mapActions } from 'vuex'

export default {
    data() {
        return {
        }
    },
    computed: {
        ...mapState({
            isSigned: state => state.user.isSigned,
            userName: state => state.user.userName,
            isSignIn: state => state.user.isSignIn,
            isSignUp: state => state.user.isSignUp,
            status: state => state.user.status,
            isErr: state => state.user.isErr,
            hasSelectedCity: state => state.user.hasSelectedCity,
            city: state => state.user.city
        }),
        un: {
            get () {
                return this.$store.state.user.un
            },
            set (value) {
                this.$store.commit('user_update_un', value)
            }
        },
        pw1: {
            get () {
                return this.$store.state.user.pw1
            },
            set (value) {
                this.$store.commit('user_update_pw1', value)
            }
        },
        pw2: {
            get () {
                return this.$store.state.user.pw2
            },
            set (value) {
                this.$store.commit('user_update_pw2', value)
            }
        }
    },
    methods: {
        ...mapMutations(['user_cancelSignin', 'user_selectCity']),
        ...mapActions(['user_changeStatus', 'user_initStatus', 'user_closePopup', 'user_checkInput', 'user_toSignIn', 'user_toSignUp']),
    },
    mounted() {
        this.user_initStatus();
    }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
	.userInfo{
		position: absolute;
		top: 0px;
		right: 0px;
		background: white;
	}
	.b_signin{
		// width: 250px;
		// height: 400px;
		position: absolute;
		left: 50%;
		top: 50%;
		// margin-left: -125px;
		// margin-top: -200px;
		transform: translate(-50%,-50%);
	    padding: 20px;
	    font-size: 20px;
	    background-color: #fff;
	    border: 1px solid #d8dee2;
        border-radius: 5px;
        text-align: left;
        i{
    	    position: absolute;
		    font-style: normal;
		    right: 20px;
		    top: 20px;
		    cursor: pointer;
	        color: #333;
        }
        h2{
    	    text-align: center;
        }
        lable{
			display: block;
			font-size: 20px;
        }
        input{
        	@extend lable;
		    padding: 6px 8px;
		    line-height: 20px;
		    color: #333;
		    border: 1px solid #ddd;
		    border-radius: 3px;
		    outline: none;
		    width: 260px;
		    box-sizing: border-box;
		    margin-bottom: 10px;
		    &[type=button]{
		    	background-image: linear-gradient(#91dd70, #55ae2e);
		    	color: #fff;
	    	    border: 1px solid #5aad35;
	    	    cursor: pointer;
		    }
        }
        div{
        	font-size: 14px;
        	text-align: right;
        }
	}
	.b_signup{
		@extend .b_signin;
	}
</style>
