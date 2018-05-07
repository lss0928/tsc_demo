<template>
    <div>12333</div>
</template>

<script>
export default {
    created() {
        // 调用API从本地缓存中获取数据
        const logs = wx.getStorageSync('logs') || []
        logs.unshift(Date.now())
        wx.setStorageSync('logs', logs)

        console.log('app created and cache logs by setStorageSync')
    }
}
</script>

<style>
/* this rule will be remove */
* {
    transition: width 2s;
    -moz-transition: width 2s;
    -webkit-transition: width 2s;
    -o-transition: width 2s;
    box-sizing: border-box;
    padding: 0;
    margin: 0;
    text-decoration: none;
}
.main {
    width: 100%;
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 100rpx;
    overflow: scroll;
    background: #eee;
}
</style>
