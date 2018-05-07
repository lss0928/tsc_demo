function formatNumber (n) {
    const str = n.toString()
    return str[1] ? str : `0${str}`
}
export function request(options) {
    return new Promise((resolve, reject) => {
        wx.request({
            url: options.url,
            method: options.method || 'get',
            data: options.data || {},
            // dataType: options.dataType || 'json',
            // header: {
            //     'content-type': 'application/x-www-form-urlencoded'
            // },
            success: (res) => {
                resolve(res)
            },
            fail: (res) => {
                reject(res)
            }
        })
    })
}
export function formatTime (date) {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()

    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()

    const t1 = [year, month, day].map(formatNumber).join('/')
    const t2 = [hour, minute, second].map(formatNumber).join(':')

    return `${t1} ${t2}`
}
export function getCategoryList() {
    return [{
        categoryId: '1',
        name: '春',
        count: '23',
        bgImg: '../../static/Tulips.jpg'
    }, {
        categoryId: '2',
        name: '夏',
        count: '33',
        bgImg: '../../static/Jellyfish.jpg'
    }, {
        categoryId: '3',
        name: '秋',
        count: '23',
        bgImg: '../../static/Chrysanthemum.jpg'
    }, {
        categoryId: '4',
        name: '冬',
        count: '33',
        bgImg: '../../static/Penguins.jpg'
    }, {
        categoryId: '5',
        name: '裙子',
        count: '33',
        bgImg: '../../static/Penguins.jpg'
    }, {
        categoryId: '6',
        name: '裤子',
        count: '33',
        bgImg: '../../static/Penguins.jpg'
    }]
}
export function getClothesList(categoryId) {
    let data = [{
        id: '1',
        name: '',
        categoryIds: '1,1',
        img: '../../static/Tulips.jpg'
    }, {
        id: '2',
        name: '',
        categoryIds: '1,1',
        img: '../../static/Jellyfish.jpg'
    }, {
        id: '2',
        name: '',
        categoryIds: '2',
        img: '../../static/Chrysanthemum.jpg'
    }, {
        id: '4',
        name: '',
        categoryIds: '1,2',
        img: '../../static/Penguins.jpg'
    }, {
        id: '5',
        name: '',
        categoryIds: '3,2',
        img: '../../static/Tulips.jpg'
    }, {
        id: '6',
        name: '',
        categoryIds: '4,2',
        img: '../../static/Jellyfish.jpg'
    }, {
        id: '7',
        name: '',
        categoryIds: '5,3',
        img: '../../static/Tulips.jpg'
    }, {
        id: '8',
        name: '',
        categoryIds: '6,4',
        img: '../../static/Jellyfish.jpg'
    }, {
        id: '9',
        name: '',
        categoryIds: '1,5',
        img: '../../static/Tulips.jpg'
    }, {
        id: '10',
        name: '',
        categoryIds: '1,5',
        img: '../../static/Jellyfish.jpg'
    }, {
        id: '11',
        name: '',
        categoryIds: '1,6',
        img: '../../static/Tulips.jpg'
    }, {
        id: '12',
        name: '',
        categoryIds: '1,6',
        img: '../../static/Jellyfish.jpg'
    }]
    if (categoryId) {
        return data.filter((item, i) => {
            return item.categoryIds.split(',').indexOf(categoryId) > -1
        })
    } else {
        return data
    }
}

