<template>
    <div>
        <div class="main">
            <div class="bg-img" @click="addImg"><img v-if="bgImg" class="img" :src="bgImg" alt="暂无图片"><p v-else class="img">+</p></div>
            <ul class="tags selected">
                <li class="tag" v-for="(item, i) in categoryList" :key="i" v-if="item.selected">{{item.name}}<span class="btn del" @click="delTag(item)">X</span></li>
            </ul>
            <ul class="tags">
                <li class="tag" v-for="(item, i) in categoryList" :key="i" v-if="!item.selected" @click="addTag(item)">{{item.name}}<span class="btn add">+</span></li>
            </ul>
            <button @click="submit">保存</button>
        </div>
        <foot></foot>
    </div>
</template>
<script>
    import foot from '@/components/footer'
    import {getCategoryList} from '@/utils/index'
    export default {
        data() {
            return {
                option: {},
                bgImg: '',
                categoryList: []
            }
        },
        components: {
            foot
        },
        methods: {
            init() {
                this.categoryList = this.formate(getCategoryList())
                this.bgImg = this.option.img || ''
            },
            formate(list) {
                list.forEach(item => {
                    if (this.option.categoryIds && this.option.categoryIds.split(',').indexOf(item.categoryId) > -1) {
                        item.selected = true
                    } else {
                        item.selected = false
                    }
                })
                return list
            },
            addImg() {
                wx.chooseImage({
                    count: 1,
                    sizeType: ['compressed'],
                    success: (res) => {
                        console.log(res)
                        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
                        this.bgImg = res.tempFilePaths[0]
                    },
                    fail: () => {}
                })
            },
            addTag(item) {
                item.selected = true
            },
            delTag(item) {
                item.selected = false
            },
            submit() {
                // wx.uploadFile({
                //     url: 'https://h5.qzone.qq.com/webapp/json/sliceUpload/FileUpload/0?seq=0&retry=0&offset=0&end=16384&total=149107&g_tk=236812065',
                //     filePath: this.bgImg,
                //     name: 'data',
                //     formData: {
                //         uin: '2509886327',
                //         appcategoryId: 'pic_qzone',
                //         session: '912103bfbc094fbf9504fba286a71c30_6461801a3f42',
                //         offset: 0
                //     },
                //     success: (res) => {
                //         console.log(res)
                //     },
                //     fail: (res) => {
                //         console.log(res)
                //     }
                // })
                // wx.request({
                //     url: 'https://servicewechat.com/',
                //     method: 'post',
                //     data: {
                //         categoryId: 1111
                //     },
                //     dataType: 'json',
                //     success: (res) => {
                //         console.log(res)
                //     },
                //     fail: (res) => {}
                // })
            }
        },
        created() {
            // this.init()
        },
        onLoad(option) {
            console.log(option)
            this.option = option
            this.init()
        }
    }
</script>
<style lang="less" scoped>
.bg-img {
        margin: 70rpx auto;
        width: 400rpx;
        height: 400rpx;
        text-align: center;
        border: 2rpx solid #ddd;
        .img {
            display: block;
            width: 100%;
            height: 100%;
            line-height: 400rpx;
        }
    }
    .tags {
        padding: 0 40rpx;
        display: block;
        clear: both;
        .tag {
            position: relative;
            display: inline-block;
            margin-right: 20rpx;
            padding: 10rpx 20rpx;
            color: #4a90e2;
            border: 2rpx solid #4a90e2;
            border-radius: 10rpx;
            margin-bottom: 40rpx;
            .btn {
                position: absolute;
                right: -10rpx;
                top: -10rpx;
                width: 26rpx;
                height: 26rpx;
                text-align: center;
                line-height: 26rpx;
                font-size: 24rpx;
                border-radius: 100%;
                &.del {
                    border: 2rpx solid #4a90e2;
                    background: #4a90e2;
                    color: #fff;
                }
                &.add {
                    border: 2rpx solid #f00;
                    background: #f00;
                    color: #fff;
                }
            }
        }
        &.selected {
            // .tag {
            //     background: #4a90e2;
            //     color: #fff;
            // }
            // .del {
            //     background: #fff;
            //     color: #4a90e2;
            // }

        }
    }
    button {
        clear: both;
        width: 200rpx;
        background: green;
        margin-bottom: 10rpx;
    }
</style>
