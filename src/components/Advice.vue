<template>
    <div class="advice">
        <div class="title">
            今日天气
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
            data: state => state.advice.data,
        }),
    },
    methods: {
        ...mapMutations(['global_setDate']),
        ...mapActions(['advice_getData']),
    },
    mounted() {
        this.global_setDate(new Date())
        this.$notify.info({
          title: '今天',
          message: `今天是${new Date()}`
        });
    }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    .advice {
        float: right;
        width: 200px;
        height: 300px;
        background-color: blue;
    }
</style>
