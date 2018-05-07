<template>
    <div class="category-footer">
        <a href="/pages/categoryList/main">首页</a>
        <a href="/pages/clothesUpload/main">上传</a>
        <a href="/pages/clothesCollocation/main">搭配</a>
        <a href="/pages/mine/main">我的</a>
    </div>
</template>
<script>
export default {
    data() {
        return {}
    }
}
</script>
<style lang="less">
.category-footer {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 98rpx;
    border-top: 2rpx solid #ccc;
    background: #ddd;
    line-height: 100rpx;
    display: flex;
    justify-content: space-around;
    a {
            color: #f00;
    }
}
</style>

