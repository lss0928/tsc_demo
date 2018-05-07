<template>
  <div>
    <div class="main">
        <div class="model">人物模型
            <canvas id="cas"></canvas>
        </div>
        <div class="weather" @click="weatherClick">
            <icon type="success" size="40" color="rgb(0,255,255)"/>
            <weather v-if="weatherShow"></weather>
        </div>
        <div class="almirah" @click="almirahClick">
            <icon type="info" size="40" color="pink"/>
            <almirah v-if="almirahShow"></almirah>
        </div>
        <div class="collection"><icon type="waiting" size="40" color="red"/></div>
        <div class="btns">
            <!--<button class="user-collocation">自由搭配</button>-->
            <button class="smart-collocation">智能搭配</button>
        </div>
    </div>
    <foot></foot>
    
  </div>
</template>
<script>
import foot from '@/components/footer'
import weather from '@/components/weather'
import almirah from '@/pages/clothesList/index'
export default {
    data() {
        return {
            weatherShow: false,
            almirahShow: false
        }
    },
    components: {
        foot,
        weather,
        almirah
    },
    methods: {
        weatherClick() {
            this.almirahShow = false
            this.weatherShow = !this.weatherShow
        },
        almirahClick() {
            this.weatherShow = false
            this.almirahShow = !this.almirahShow
        }
    }
}
</script>

<style lang="less" scoped>
    .model {
        width: 600rpx;
        min-height: 300rpx;
        border: 1px solid #ccc;
        margin: 0 auto;
    }
    .weather, .almirah, .collection {
        position: absolute;
        right: 20rpx;
        top: 200rpx;
    }
    .almirah {
        top: 400rpx;
    }
    .collection {
        top: 600rpx;
    }
    .btns {
        width: 100%;
        position: absolute;
        bottom: 20rpx;
        left: 0;
        text-align: center;
        .user-collocation, .smart-collocation {
            display: inline-block;
            width: 200rpx;
            margin: 0 10rpx;
        }
        .smart-collocation {
            background: green;
        }
    }
    
</style>

