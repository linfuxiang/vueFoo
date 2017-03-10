<template>
    <div class="advice">
        
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
            
        })
    },
    methods: {
    },
    mounted() {
        this.$notify.info({
          title: '消息',
          message: '这是一条消息的提示消息'
        });
    }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
