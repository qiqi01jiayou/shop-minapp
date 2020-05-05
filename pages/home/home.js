import {Theme} from "../../models/theme";
import {Banner} from "../../models/banner";
import {Category} from "../../models/category";
import {Activity} from "../../models/activity";
import {SpuPaging} from "../../models/spu-paging";

Page({

    /**
     * 页面的初始数据
     */
    data: {
        themeA: null,
        bannerB: null,
        gridC: [],
        activityD: null,
        themeE: null,
        themeESpu: [],
        themeF: null,
        bannerG: null,
        themeH: null,
        paging:null,
        loadingType:'loading'
    },

    /**
     * 生命周期函数--监听页面加载
     */
    async onLoad(options) {
        await this.initAllData()
        await this.initBottomSpuList()
    },

    async initBottomSpuList() {
        let paging = SpuPaging.getLatestPaging({url:'spu'},3)
        this.data.paging = paging
        let data = await paging.getMoreData()
        if(!data) {
            return
        }
        wx.lin.renderWaterFlow(data.items)
    },

    async initAllData() {
        //theme spu
        let theme = new Theme()
        await theme.getThemes()
        let themeA = theme.getTheme({name: 't-1'})
        let themeE = theme.getTheme({name: 't-2'})
        let themeF = theme.getTheme({name: 't-3'})
        let themeH = theme.getTheme({name: 't-4'})
        let themeESpu
        if (themeE.online) {
            let data = await theme.getSpu()
            if (data.items) {
                themeESpu = data.items.splice(0, 8)
            }
        }
        //banner
        let banner = new Banner()
        await banner.getBanners()
        let bannerB = banner.getBanner({name: 'b-1'})
        let bannerG = banner.getBanner({name: 'b-2'})
        //grid
        let gridC = await Category.getHomeLocationC()
        //activity
        let activityD = await Activity.getHomeLocationD()
        //spupaging


        this.setData({
            themeA,
            themeE,
            themeESpu,
            bannerB,
            gridC,
            activityD,
            themeF,
            bannerG,
            themeH
        })
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    async onReachBottom() {
        let data = await this.data.paging.getMoreData()
        if(!data){
            this.setData({
                loadingType:'end'
            })
            return
        }
        wx.lin.renderWaterFlow(data.items)
        if(!data.moreData){
            this.setData({
                loadingType:'end'
            })
        }
    },
})