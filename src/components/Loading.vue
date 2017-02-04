<template>
    <div class="loading">
        <div class="background"></div>
        <div class="spinner">
            <div class="dot1"></div>
            <div class="dot2"></div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
        }
    },
    mounted() {
    }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.loading {
    
}

.background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.5);
    z-index: 9998;
}

.spinner {
    position: absolute;
    left: 50%;
    top: 50%;
    margin-top: -45px;
    margin-left: -45px;
    width: 90px;
    height: 90px;
    /*position: relative;*/
    text-align: center;
    z-index: 9999;

    -webkit-animation: rotate 2.0s infinite linear;
    animation: rotate 2.0s infinite linear;
}
 
.dot1, .dot2 {
    width: 60%;
    height: 60%;
    display: inline-block;
    position: absolute;
    top: 0;
    background-color: #67CF22;
    border-radius: 100%;

    -webkit-animation: bounce 2.0s infinite ease-in-out;
    animation: bounce 2.0s infinite ease-in-out;
}
 
.dot2 {
    top: auto;
    bottom: 0px;
    -webkit-animation-delay: -1.0s;
    animation-delay: -1.0s;
}
 
@-webkit-keyframes rotate { 100% { -webkit-transform: rotate(360deg) }}
@keyframes rotate { 100% { transform: rotate(360deg); -webkit-transform: rotate(360deg) }}
 
@-webkit-keyframes bounce {
    0%, 100% { -webkit-transform: scale(0.0) }
    50% { -webkit-transform: scale(1.0) }
}
 
@keyframes bounce {
    0%, 100% {
        transform: scale(0.0);
        -webkit-transform: scale(0.0);
    } 50% {
        transform: scale(1.0);
        -webkit-transform: scale(1.0);
    }
}
</style>
