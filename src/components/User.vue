<template>
    <div class="user">
    	<div class="sign" v-if="!isSigned">
    		<a href="" @click.prevent="toSignIn">登录</a>
	        <span>/</span>
	        <a href="" @click.prevent="toSignUp">注册</a>
    	</div>
    	<div class="signed" v-else>
    		<a href="" @click.prevent="cancelSignin">登出</a>
    	</div>
        <div class="b_signin" v-if="isSignIn">
        	<i @click="closePopup">×</i>
        	<h2>登录</h2>
        	<label for="un">用户名</label>
        	<input name="un" type="text" v-model.trim="un">
        	<label for="pw">密码</label>
        	<input name="pw" type="password" v-model.trim="pw1">
        	<div v-show="isErr">{{status}}</div>
        	<input type="button" value="登录" @click="checkInput(1)">
        	<div>
        		<a href="" @click.prevent="toSignUp">没有账号，去注册</a>
        	</div>
        </div>
        <div class="b_signup" v-if="isSignUp">
        	<i @click="closePopup">×</i>
        	<h2>注册</h2>
        	<label for="un">用户名</label>
        	<input name="un" type="text" v-model.trim="un">
        	<label for="pw1">密码</label>
        	<input name="pw1" type="password" v-model.trim="pw1">
        	<label for="pw2">确认密码</label>
        	<input name="pw2" type="password" v-model.trim="pw2">
        	<div v-show="isErr">{{status}}</div>
        	<input type="button" value="注册" @click="checkInput(2)">
        	<div>
        		<a href="" @click.prevent="toSignIn">已有账号，去登录</a>
        	</div>
        </div>
    </div>
</template>
<script>
import GLOBAL_PATH from 'static/path.js'

export default {
    data() {
        return {
        	userName: '',
            isSigned: false,
            isSignIn: false,
            isSignUp: false,
            un: '',
            pw1: '',
            pw2: '',
            status: '用户名或密码错误',
            isErr: false,
            signUri: GLOBAL_PATH.JSONP_URI
        }
    },
    methods: {
    	toSignIn() {
    		this.initStatus();
    		this.isSignIn = true; 
    	},
    	toSignUp() {
    		this.initStatus();
			this.isSignUp = true;
    	},
    	closePopup() {
    		this.initStatus();
    	},
        cancelSignin() {
        	this.userName = '';
        	this.isSigned = false;
        },
        initStatus() {
            this.isSignIn = false;
            this.isSignUp = false;
            this.un = '';
            this.pw1 = '';
            this.pw2 = '';
            this.status = '用户名或密码错误';
            this.isErr = false;
        },
        showErr() {
        	this.isErr = true;
        },
        checkInput(type) {
        	this.isErr = false;
        	if(!this.un || !this.pw1){
        		this.showErr();
        		return false;
        	}
        	switch(type){
        		//登录
        		case 1: 
        			this.$http.jsonp(this.signUri + 'signin', {
			            params: {
			                un: this.un,
			                pw: this.pw1
			            }
			        }).then((res) => {
			            let data = res.data;
			            if(data.status == 200) {
			            	this.initStatus();
			            	this.userName = data.un;
			            	this.isSigned = true;
			            } else {
			            	this.isErr = true;
			            }
			        }, (err) => {
			            console.log(err);
			        });
        			break;
        		//注册
        		case 2:
        			if(this.pw1 !== this.pw2){
        				this.status = '用户名已存在或密码不相同';
						this.showErr();
        				return false;
        			}
        			this.$http.jsonp(this.signUri + 'signup', {
			            params: {
			                un: this.un,
			                pw: this.pw1
			            }
			        }).then((res) => {
			            let data = res.data;
			            if(data.status == 200) {
			            	this.initStatus();
			            	this.userName = data.un;
			            	this.isSigned = true;
			            } else {
			            	this.status = '用户名已存在或密码不相同';
			            	this.isErr = true;
			            }
			        }, (err) => {
			            console.log(err);
			        });
        			break;
        	}
        }
    }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
	.sign{
		position: absolute;
		top: 0px;
		right: 0px;
	}
	.signed{
		@extend .sign;
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
