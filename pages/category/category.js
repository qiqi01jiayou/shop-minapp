// pages/category/category.js
import {getSystemSize, getWindowHeight} from "../../utils/system";
import {px2rpx} from "../../miniprogram_npm/lin-ui/utils/util";

Page({

    /**
     * 页面的初始数据
     */
    data: {},

    /**
     * 生命周期函数--监听页面加载
     */
    async onLoad(options) {
        let windowHeightRpx = await getWindowHeight()
        let h = windowHeightRpx - 60 - 20 - 2
        this.setData({
            segHeight:h
        })
    },
    onGotoSearch() {
        wx.navigateTo({
            url:`/pages/search/search`
        })
    }
})