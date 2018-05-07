<template>
<div>
    <div class="main">
        <div class="userinfo">
            <img class="userinfo-avatar" v-if="userInfo.avatarUrl" :src="userInfo.avatarUrl" background-size="cover" />
            <div class="userinfo-nickname">
                {{userInfo.nickName}}
            </div>
        </div>
        <ul class="list">
            <li><a href="/pages/mineInfo/main"><icon type="info" size="15" color="gray"/>个人信息</a></li>
            <li><a href="/pages/mineInfo/main"><icon type="info" size="15" color="gray"/>设置</a></li>
            <li><a href="/pages/mineInfo/main"><icon type="info" size="15" color="gray"/>退出</a></li>
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
            userInfo: {
                avatarUrl: '',
                nickName: ''
            }
        }
    },
    components: {
        foot
    },
    methods: {
        init() {
            this.getUserInfo()
        },
        getUserInfo() {
            wx.getUserInfo({
                success: (res) => {
                    this.userInfo = res.userInfo
                    console.log(res)
                    wx.showToast({
                        title: '成功',
                        icon: 'success',
                        duration: 2000,
                        mask: true
                    })
                },
                fail: (res) => {
                    console.log(res)
                }
            })
        }
    },
    created() {
        this.init()
    }
}
</script>
<style lang="less" scoped>
    .userinfo {
        display: flex;
        flex-direction: row;
        align-items: center;
    }

    .userinfo-avatar {
        width: 128rpx;
        height: 128rpx;
        margin: 20rpx;
        border-radius: 50%;
    }

    .userinfo-nickname {
        color: #aaa;
    }
    .list {
        width: 100%;
        margin-top: 100rpx;
        border-top: 2rpx solid #ccc;
        li {
            border-bottom: 2rpx solid #ccc;
            height: 60rpx;
            line-height: 60rpx;
            padding-left: 20rpx;
            ._icon {
                margin-right: 20rpx;
            }
        }
    }
</style>

