<template>
    <div class="container" @click="clickHandle('test click', $event)">

        <div class="userinfo" @click="bindViewTap">
            <img class="userinfo-avatar" v-if="userInfo.avatarUrl" :src="userInfo.avatarUrl" background-size="cover" />
            <div class="userinfo-nickname">
                <card :text="userInfo.nickName"></card>
            </div>
        </div>

        <div class="usermotto">
            <div class="user-motto">
                <card :text="motto"></card>
            </div>
        </div>

        <form class="form-container">
            <input type="text" class="form-control" v-model="motto" placeholder="v-model" />
            <input type="text" class="form-control" v-model.lazy="motto" placeholder="v-model.lazy" />
            <!--select 组件用 picker 组件进行代替-->
            <picker @change="bindPickerChange" :value="index" :range="array">
                <view class="picker">
                    当前选择：{{array[index]}}
                </view>
            </picker>
            <!--表单元素 radio 用 radio-group 组件进行代替-->
            <radio-group class="radio-group" @change="radioChange">
                <label class="radio" v-for="(item, index) in items" :key="item.val">
                    <radio :value="item.val" :checked="item.checked" /> {{item.text}}
                </label>
            </radio-group>

            <picker mode="date" :value="date" start="2015-09-01" end="2017-09-01" @change="bindDateChange">
                <view class="picker">
                    当前选择: {{date}}
                </view>
            </picker>
        </form>
        <a href="/pages/counter/main" class="counter">去往Vuex示例页面</a>
        <button @click="handleToLog">查看login日志</button>
        <button @click="scanCode">扫一扫</button>
    </div>
</template>

<script>
import card from '@/components/card'
import { request } from '@/utils/index'
export default {
    data () {
        return {
            motto: 'Hello World',
            userInfo: {},
            index: 0,
            array: ['A', 'B', 'C'],
            items: [
                { val: 'USA', text: '美国' },
                { val: 'CHN', text: '中国', checked: 'true' },
                { val: 'BRA', text: '巴西' },
                { val: 'JPN', text: '日本' },
                { val: 'ENG', text: '英国' },
                { val: 'TUR', text: '法国' }
            ],
            date: '2018-4-18',
            tabBar: {
                list: [{
                    pagePath: '/pages/counter/main',
                    text: '去往Vuex示例页面'
                }, {
                    pagePath: '/pages/logs/main',
                    text: '查看login日志'
                }]
            }
        }
    },

    components: {
        card
    },

    methods: {
        bindViewTap () {
            const url = '../logs/main'
            wx.navigateTo({ url })
        },
        getUserInfo () {
            wx.showToast({
                title: '登录中...',
                icon: 'loading',
                duration: 2000,
                mask: true
            })
            setTimeout(() => {
                // 调用登录接口
                wx.login({
                    success: () => {
                        wx.getUserInfo({
                            success: (res) => {
                                this.userInfo = res.userInfo
                                wx.showToast({
                                    title: '成功',
                                    icon: 'success',
                                    duration: 2000,
                                    mask: true
                                })
                            }
                        })
                    }
                })
            }, 1000)
        },
        clickHandle (msg, ev) {
            console.log('clickHandle:', msg, ev)
        },
        bindPickerChange (e) {
            console.log(e)
            this.index = e.target.value
        },
        radioChange (e) {
            wx.showModal({
                title: '提示',
                content: '这是一个模态弹窗',
                success: (res) => {
                    if (res.confirm) {
                        console.log('用户点击确定')
                    } else if (res.cancel) {
                        console.log('用户点击取消')
                    }
                }
            })
            console.log(e, 'radio发生change事件，携带value值为：', e.target.value)
        },
        bindDateChange (e) {
            console.log(e)
            this.date = e.target.value
            wx.showActionSheet({
                itemList: ['showActionSheetA', 'showActionSheetB', 'showActionSheetC'],
                success: (res) => {
                    console.log(res.tapIndex)
                },
                fail: (res) => {
                    console.log(res.errMsg)
                }
            })
        },
        handleToLog () {
            wx.navigateTo({
                url: '/pages/logs/main?id=' + 1
            })
        },
        scanCode () {
            // 允许从相机和相册扫码
            wx.scanCode({
                success: (res) => {
                    console.log(res, '扫一扫')
                },
                fail: (res) => {
                    console.log(res, '扫一扫fail')
                }
            })
        }
    },

    created () {
        // 调用应用实例的方法获取全局数据
        this.getUserInfo()
        request({
            url: 'https://www.baidu.com',
            method: 'POST',
            data: {
                id: '1524555096000397001'
            }
        }).then(res => {
            console.log(res)
        }).catch(res => {
            console.log(res)
        })
    },
    onLoad: (option) => {
        console.log(option)
    }
}
</script>

<style scoped>
.userinfo {
    display: flex;
    flex-direction: column;
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

.usermotto {
    /*margin-top: 150px;*/
}

.form-control {
    display: block;
    padding: 0 12px;
    margin-bottom: 5px;
    border: 1px solid #ccc;
}

.counter {
    display: inline-block;
    margin: 10px auto;
    padding: 5px 10px;
    color: blue;
    border: 1px solid blue;
}
</style>
