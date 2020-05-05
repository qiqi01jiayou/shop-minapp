// pages/detail/detail.js
import {Spu} from "../../models/spu";
import {ShoppingWay} from "../../core/enum";
import {SaleExplain} from "../../models/sale-explain";
import {getWindowHeight} from "../../utils/system";

Page({

    /**
     * 页面的初始数据
     */
    data: {
        spu:null,
        showRealm:false,
        explain:[]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    async onLoad(options) {
        let pid = options.pid
        let spu = await Spu.getDetail(pid)
        let explain = await SaleExplain.getFixed()
        //动态高度
        let windowHeightRpx = await getWindowHeight()
        let h = windowHeightRpx-100
        this.setData({
            spu:spu[0],
            explain,
            h
        })
    },
    //回首页
    onGotoHome(event){
        wx.switchTab({
            url:'/pages/home/home'
        })
    },
    //去购物车
    onGotoCart(event){
        wx.switchTab({
            url:'/pages/cart/cart'
        })
    },
    //添加购物车
    onAddToCart(event){
        this.setData({
            showRealm:true,
            orderWay:ShoppingWay.CART
        })
    },
    //立即购买
    onBuy(event){
        this.setData({
            showRealm:true,
            orderWay:ShoppingWay.BUY
        })
    },
    //获取子组件数据
    onSpecChange(event){
        this.setData({
            specs:event.detail
        })
    }
})