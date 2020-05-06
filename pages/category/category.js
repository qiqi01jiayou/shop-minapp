// pages/category/category.js
import {getSystemSize, getWindowHeight} from "../../utils/system";
import {px2rpx} from "../../miniprogram_npm/lin-ui/utils/util";
import {Categories} from "../../models/categories";
import {SpuListType} from "../../core/enum";

Page({

    /**
     * 页面的初始数据
     */
    data: {
        defaultRootId: 3
    },


    /**
     * 生命周期函数--监听页面加载
     */
    async onLoad(options) {
        await this.initHeight();
        await this.initCategoryData()
    },
    /**
     * 初始化类别数据（一次性加载所有）
     */
    async initCategoryData() {
        let categories = new Categories();
        this.data.categories = categories
        await categories.getAll()
        let roots = categories.getRoots()
        let defaultRoot = categories.getCurrentRoot(this.data.defaultRootId);
        let defaultSubs = categories.getSubsByRoot(this.data.defaultRootId)
        this.setData({
            roots,
            currentSubs: defaultSubs,
            currentBannerImg: defaultRoot.img
        })
    },
    /**
     * 切换选项卡
     * @param event
     */
    onSegChange(event) {
        let activeKey = event.detail.activeKey;
        let currentRoot = this.data.categories.getCurrentRoot(Number.parseInt(activeKey));
        let currentSubs = this.data.categories.getSubsByRoot(Number.parseInt(activeKey))
        this.setData({
            currentSubs,
            currentBannerImg: currentRoot.img
        })
    },
    /**
     * 初始化选项卡高度（动态）
     * @returns {Promise<void>}
     */
    async initHeight() {
        let windowHeightRpx = await getWindowHeight()
        let h = windowHeightRpx - 60 - 20 - 2
        this.setData({
            segHeight: h
        })
    },
    /**
     *跳转商品列表
     * @param event
     */
    onJumpToSpuList(event) {
        let cid = event.detail.cid
        wx.navigateTo({
            url: `/pages/spu-list/spu-list?cid=${cid}&type=${SpuListType.SUB_CATEGORY}`
        })
    },
    /**
     * 跳转搜索
     */
    onGotoSearch(event) {
        wx.navigateTo({
            url: `/pages/search/search`
        })
    }
})