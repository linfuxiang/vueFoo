<template>
    <div class="user">
        <div class="userInfo">
            <div class="sign" v-show="!isSigned">
                <!-- <a href="" @click.prevent="user_toSignIn">登录</a> -->
                <el-button type="text" @click="user_toSignIn">登录</el-button>
                <span>/</span>
                <!-- <a href="" @click.prevent="user_toSignUp">注册</a> -->
                <el-button type="text" @click="user_toSignUp">注册</el-button>
            </div>
            <div class="signed" v-show="isSigned">
                <span>用户：{{userName}}</span>
                <el-button type="text" @click="user_cancelSignin">登出</el-button>
            </div>
            <city></city>
        </div>
        <el-dialog title="登录" v-model="isSignIn" @close="user_closeSignIn">
            <el-form ref="signIn" label-width="85px" class="demo-ruleForm">
                <el-form-item label="用户名">
                    <el-input type="text" v-model.trim="un" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="密码">
                    <el-input type="password" v-model.trim="pw1" auto-complete="off"></el-input>
                </el-form-item>
                <!-- <el-form-item> -->
                    <div class="error" v-show="isErr">{{status}}</div>
                    <el-button type="primary" @click="user_checkInput(1)">登录</el-button><br>
                    <el-button type="text" @click="user_toSignUp">没有账号，去注册</el-button>
                    <!-- <el-button @click="resetForm('ruleForm2')">重置</el-button> -->
                <!-- </el-form-item> -->
            </el-form>
        </el-dialog>
        <el-dialog title="注册" v-model="isSignUp" @close="user_closeSignUp">
            <el-form ref="signUp" label-width="85px" class="demo-ruleForm">
                <el-form-item label="用户名">
                    <el-input type="text" v-model.trim="un" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="密码">
                    <el-input type="password" v-model.trim="pw1" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="确认密码">
                    <el-input type="password" v-model.trim="pw2" auto-complete="off"></el-input>
                </el-form-item>
                <!-- <el-form-item> -->
                    <div class="error" v-show="isErr">{{status}}</div>
                    <el-button type="primary" @click="user_checkInput(2)">注册</el-button><br>
                    <el-button type="text" @click="user_toSignIn">已有账号，去登录</el-button>
                    <!-- <el-button @click="resetForm('ruleForm2')">重置</el-button> -->
                <!-- </el-form-item> -->
            </el-form>
        </el-dialog>
        <!-- <div class="b_signin" v-if="isSignIn">
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
        </div> -->
        <!-- <div class="b_signup" v-if="isSignUp">
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
        </div> -->
    </div>
</template>
<script>
import { mapState } from 'vuex'
import { mapMutations } from 'vuex'
import { mapActions } from 'vuex'
// import city from './City'

export default {
    data() {
        return {
            rules: {
                un: [
                    { required: true, message: '请输入用户名', trigger: 'blur' },
                ],
                pw1: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                ],
                pw2: [
                    { required: true, message: '请输入确认密码', trigger: 'blur' },
                ],
            }
        }
    },
    components: {
        city: function(resolve){
            require(['./City'], resolve);
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
        ...mapMutations(['user_cancelSignin', 'user_selectCity', 'user_closeSignUp', 'user_closeSignIn']),
        ...mapActions(['user_changeStatus', 'user_initStatus', 'user_closePopup', 'user_checkInput', 'user_toSignIn', 'user_toSignUp']),
        // submitForm(arg, formName) {
        //     console.log(1)
        //     this.$refs[formName].validate((valid) => {
        //         console.log(valid)
        //         if (valid) {
        //             // alert('submit!');
        //             this.user_checkInput(arg);
        //         } else {
        //             console.log('error submit!!');
        //             return false;
        //         }
        //     });
        // }
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
		background: transparent;
	}
    .error{
        color: #FF4949;
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
