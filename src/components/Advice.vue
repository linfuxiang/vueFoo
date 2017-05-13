<template>
    <div class="advice bad" v-if="canShow" :class="{good:now.code==0||now.code==2||now.code==38}">
        <el-tooltip class="tooltip" effect="dark" content="刷新一下" placement="bottom">
            <i class="el-icon-view" @click="advice_getData"></i>
        </el-tooltip>
        <div class="now">
            <div class="title">
                {{ location.name }}
                <span class="title-time">{{ time | timeFormatter }}</span>
            </div>
            <div class="details" style="text-align:center;">
                <div class="details-temp">{{ now.temperature }}</div>
                <div class="details-default">°C</div>
                <div class="details-default">{{ now.text }}
                    <br><img :src="`static/img/icons/${now.code}.png`"></div>
            </div>
            <div class="details-default" style="font-weight: bold;font-size: 20px;text-align:center;">空气：{{ now.situ }} {{ now.aqi }}</div>
            <div class="brief">
                <div class="">洗车指数
                    <br><span>{{ suggestion.car_washing.brief }}</span></div>
                <div class="">穿衣指数
                    <br><span>{{ suggestion.dressing.brief }}</span></div>
                <div class="">感冒指数
                    <br><span>{{ suggestion.flu.brief }}</span></div>
            </div>
            <div class="brief">
                <div class="">运动指数
                    <br><span>{{ suggestion.sport.brief }}</span></div>
                <div class="">旅游指数
                    <br><span>{{ suggestion.travel.brief }}</span></div>
                <div class="">紫外线强度
                    <br><span>{{ suggestion.uv.brief }}</span></div>
            </div>
        </div>
        <div class="daily">
            <div class="daily-details" v-for="item in daily">
                <div>{{ item.date | MDformatter }}</div>
                <div>{{ item.low }}°C / {{ item.high }}°C</div>
                <div>{{ item.text_day }} / {{ item.text_night }}</div>
                <div>{{ item.wind_direction }}风{{ item.wind_scale }}级</div>
            </div>
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
            isDay: false,
            time: new Date(),
        }
    },
    computed: {
        ...mapState({
            canShow: state => state.advice.canShow,
            now: state => state.advice.now,
            daily: state => state.advice.daily,
            location: state => state.advice.location,
            suggestion: state => state.advice.suggestion,
        }),
    },
    methods: {
        ...mapMutations(['global_setDate']),
        ...mapActions(['advice_getData']),
    },
    mounted() {
        // this.advice_getData();
        setInterval(() => {
            this.time = new Date();
        }, 1000);
    }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.advice {
    // float: right;
    width: 300px;
    color: white;
    font-weight: lighter;
    text-align: left;
    // border-radius: 5px;
    // font-size: 18px;
    .tooltip {
        float: right;
    }
    i {
        padding: 15px 15px 0 0;
        cursor: pointer;
    }
    &.bad {
        background: linear-gradient(#566b6e, #7d939b);
    }
    &.good {
        background: linear-gradient(#2869e9, #79bfff);
    }
    .now {
        padding: 8px 10px;
        border-bottom: 1px solid rgba(255, 255, 255, 0.5);
        .title {
            font-weight: bold;
            font-size: 18px;
            .title-time {
                font-weight: lighter;
                font-size: 14px;
                opacity: 0.6;
            }
        }
        .details {
            div {
                display: inline-block;
                vertical-align: top;
                text-align: center;
            }
            img {
                position: static;
                width: 30px;
            }
            .details-default {
                padding-top: 8px;
                vertical-align: top;
                margin-right: 15px;
            }
            .details-temp {
                font-size: 50px;
            }
        }
        .brief {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-around;
            div {
                width: 75px;
                display: inline-block;
                text-align: center;
                font-size: 12px;
                span {
                    font-weight: bold;
                }
            }
        }
    }
    .daily {
        display: flex;
        padding: 8px 0px;
        .daily-details {
            font-size: 14px;
            flex: 1;
            text-align: center;
            box-sizing: border-box;
            padding: 0 3px;
            border-right: 1px solid rgba(255, 255, 255, 0.5);
            &:last-of-type {
                border: none;
            }
        }
    }
}
</style>
