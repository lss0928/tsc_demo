<template>
    <div>
        <div class="main">
            <ul class="category-list">
                <li class="category-item" v-for="item in categoryList" :key="item" @click="goClothesList(item)" :style="{ background: 'url('+item.bgImg+')', backgroundSize: '100% 100%' }">
                    <span class="category-name">{{item.name}}</span>
                    <!--<img :src="item.bgImg" alt="">-->
                    <span class="category-count">{{item.count}}</span>
                </li>
                <li class="category-item">
                    <span class="category-name"><a href="/pages/categoryAdd/main">自定义</a></span>
                </li>
                <li class="category-item" v-show="categoryList.length % 2 === 0" style="visibility: hidden;">
                    <span class="category-name">占位</span>
                </li>
            </ul>
        </div>
        <foot></foot>
    </div>
</template>
<script>
import foot from '@/components/footer'
import { getCategoryList } from '@/utils/index'
export default {
    data() {
        return {
            categoryList: []
        }
    },
    components: {
        foot
    },
    methods: {
        init() {
            this.categoryList = getCategoryList()
        },
        goClothesList(item) {
            wx.navigateTo({
                url: '/pages/clothesList/main?categoryId=' + item.categoryId + '&name=' + item.name
            })
        }
    },
    created() {
        this.init()
    }
}
</script>
<style lang="less" scoped>
    .category-list {
        display: flex;
        justify-content: space-around;
        flex-wrap: wrap; 
        .category-item {
            position: relative;
            width: 320rpx;
            height: 320rpx;
            text-align: center;
            border-radius: 5px;
            border: 1px solid #ccc;
            margin-bottom: 30rpx;
            color: #fff;
            .category-name {
                display: block;
                width: 100%;
                height: 100%;
                background: rgba(0,0,0,.5);
                line-height: 320rpx;
            }
            .category-count {
                position: absolute;
                right: 1rpx;
                bottom: 1rpx;
            }
        }
        
    }
</style>

