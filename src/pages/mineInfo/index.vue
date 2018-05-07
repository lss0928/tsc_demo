<template>
    <div>
        <div class="main">
            <ul class="info">
                <li v-for="item in data" :key="item">{{item.text}}: <span>{{item.value}}</span></li>
            </ul>
        </div>
        <foot></foot>
    </div>
</template>
<script>
import foot from '@/components/footer'
export default {
    data() {
        return {
            data: [{
                name: 'img',
                text: '照片',
                value: ''
            }, {
                name: 'sex',
                text: '性别',
                value: '女'
            }, {
                name: 'age',
                text: '年龄',
                value: '25'
            }, {
                name: 'height',
                text: '身高',
                value: '163'
            }, {
                name: 'weight',
                text: '体重',
                value: '53kg'
            }, {
                name: 'measurements',
                text: '三围',
                value: '53, 47, 70'
            }]
        }
    },
    components: {
        foot
    },
    methods: {}
}
</script>
<style lang="less" scoped>
    .info {
        width: 100%;
        margin-top: 50rpx;
        border-top: 2rpx solid #ccc;
        li {
            height: 60rpx;
            line-height: 60rpx;
            padding-left:20rpx;
            border-bottom: 2rpx solid #ccc;
        }
    }
</style>

