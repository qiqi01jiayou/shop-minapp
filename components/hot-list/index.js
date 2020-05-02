// components/hot-list/index.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        banner: Object
    },

    observers: {
        "banner"(banner) {
            if (!banner || banner.items.length === 0) return
            let left = banner.items.find(v => v.name === 'left')
            let right_top = banner.items.find(v => v.name === 'right-top')
            let right_bottom = banner.items.find(v => v.name === 'right-bottom')
            this.setData({
                left,
                right_top,
                right_bottom
            })
        }
    },
    /**
     * 组件的初始数据
     */
    data: {

    },

    /**
     * 组件的方法列表
     */
    methods: {}
})