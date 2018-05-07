<template>
<div>
    <div :class="categoryId ? 'main' : 'main-dialog'">
        <ul :class="categoryId ? 'list' : 'list-dialog'">
            <li v-for="item in clothesList" :key="item">
                <a class="item" :href="'/pages/clothesUpload/main?categoryIds='+item.categoryIds+'&img='+item.img" :style="{ background: 'url('+item.img+')', backgroundSize: '100% 100%' }"></a>
            </li>
        </ul>
    </div>
    <foot v-if="categoryId"></foot>
</div>
</template>
<script>
    import foot from '@/components/footer'
    import {getClothesList} from '@/utils/index'
    export default {
        data() {
            return {
                title: '',
                categoryId: '',
                clothesList: []
            }
        },
        components: {
            foot
        },
        methods: {
            init() {
                wx.setNavigationBarTitle({
                    title: this.title
                })
                this.clothesList = getClothesList(this.categoryId)
            }
        },
        onLoad(option) {
            this.categoryId = option.categoryId || 0
            this.title = option.name || ''
            this.init()
        }
    }
</script>
<style lang="less" scoped>
    .list {
        .item {
            float: left;
            margin : 20rpx;
            width: 200rpx;
            height: 200rpx;
        }
    }
    .main-dialog {
        width: 360rpx;
        height: 400rpx;
        overflow: auto;
        position: absolute;
        right: 100rpx;
        top: 0;
        border: 2rpx solid #fff;
        border-radius: 10rpx;
        background: rgba(0,0,0,.5);
        padding: 10rpx;
        .list-dialog {
            .item {
                float: left;
                margin: 10rpx;
                width: 100rpx;
                height: 100rpx;
            }
        }
    }
</style>

