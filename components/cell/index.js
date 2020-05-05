// components/cell/index.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        cell: Object,
        y: Number,
        x: Number
    },

    observers: {
        "cell"(val) {

        }
    },

    /**
     * 组件的初始数据
     */
    data: {},

    /**
     * 组件的方法列表
     */
    methods: {
        onTap(event) {
            this.triggerEvent('cellTap', {
                //回传父组件
                cell: this.properties.cell,
                x: this.properties.x,
                y: this.properties.y
            }, {
                bubbles: true,
                composed: true
            })
        }
    }
})
