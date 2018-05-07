<template>
    <div>
        <div class="main">
            <div class="bg-img" @click="addImg"><img v-if="bgImg" class="img" :src="bgImg" alt="暂无图片">
                <span v-else class="img">+</span>
            </div>
            <div class="title">
                <p>分类名称</p><input type="text" v-model="title"></div>
            <button @click="submit">添加</button>
        </div>
        <foot></foot>
    </div>
</template>
<script>
import foot from '@/components/footer'
export default {
    data() {
        return {
            bgImg: '',
            title: ''
        }
    },
    components: {
        foot
    },
    methods: {
        addImg() {
            wx.chooseImage({
                count: 1,
                sizeType: ['compressed'],
                success: (res) => {
                    console.log(res)
                    // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
                    this.bgImg = res.tempFilePaths[0]
                },
                fail: () => { }
            })
        },
        submit() {
            wx.showLoading({
                mask: true,
                title: '添加中...'
            })
            setTimeout(() => {
                wx.hideLoading()
                wx.showToast({
                    title: '添加成功',
                    icon: 'success',
                    duration: 2000,
                    mask: true,
                    success: () => {
                        wx.navigateTo({ url: '../categoryList/main' })
                    }
                })
            }, 2000)
        }
    }
}
</script>
<style lang="less" scoped>
.bg-img {
    text-align: center;
    margin: 70rpx auto;
    width: 600rpx;
    height: 600rpx;
    border: 2rpx solid #ddd;
    .img {
        display: block;
        width: 100%;
        height: 100%;
        text-align: center;
        line-height: 600rpx;
    }
}

.title {
    width: 80%;
    margin: 0 auto;
    text-align: center;
    input {
        border: 2rpx solid #ddd;
        margin: 40rpx 0;
    }
}

button {
    width: 200rpx;
    background: green;
}
</style>

