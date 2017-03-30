<template>
    <div class="hello">
        <div class="ul">
            <ul>
                <li v-for="item in discussionLists">
                    <div class="info">
                        <span>{{ item.user }}</span>
                        <span>{{ item.area }}</span>
                        <span>{{ item.timestamp | timeFormatter }}</span>
                        <!-- <span>{{ new Date(item.timestamp) }}</span> -->
                    </div>
                    <div class="content">{{ item.content }}</div>
                </li>
            </ul>
            <div class="input" v-if="isSigned">
                <el-row :gutter="20">
                    <el-col :span="20">
                        <el-input v-model="input" placeholder="请输入内容" type="textarea" :rows="1"></el-input>
                    </el-col>
                    <el-col :span="4">
                        <el-button type="primary" @click="hello_submit">主要按钮</el-button>
                    </el-col>
                </el-row>
            </div>
        </div>
        <advice></advice>
    </div>
</template>
<script>
import { mapState } from 'vuex'
import { mapActions } from 'vuex'
import advice from './Advice'

export default {
    data() {
        return {
            // title: 'a'
            // input: ''
        }
    },
    computed: {
        ...mapState({
            title: state => state.hello.title,
            discussionLists: state => state.hello.discussionLists,
            isSigned: state => state.user.isSigned,
        }),
        input: {
            get () {
                return this.$store.state.hello.input
            },
            set (value) {
                this.$store.commit('hello_update_input', value)
            }
        },
    },
    components: {       
        advice,
    },
    methods: {
        ...mapActions(['hello_getData', 'hello_submit']),
    },
    mounted() {
        this.hello_getData(this.input);
    },
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.hello {
    margin-top: 10px!important;
    &:after {
        display: block;
        height: 0;
        content: '';
        clear: both;
    }
}
.ul {
    float: left;
    width: 650px;
    text-align: left;
    height: 500px;
    position: relative;
    ul {
        overflow-y: auto;
        overflow-x: hidden;
        height: 450px;
        li {
            // border: 1px solid #666;
            margin-bottom: 10px;
            padding: 5px 10px;
            background: #eee;
            .content {
                padding-left: 50px;
            }
        }
    }
    .input {
        padding: 5px 10px;
        background: #eee;
        // position: absolute;
        // bottom: 0;
        // left: 0;
        // width: 100%;
    }
}
</style>
