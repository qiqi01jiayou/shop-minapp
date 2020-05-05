// pages/detail/detail.js
import {Spu} from "../../models/spu";

Page({

    /**
     * 页面的初始数据
     */
    data: {
        spu:null
    },

    /**
     * 生命周期函数--监听页面加载
     */
    async onLoad(options) {
        let pid = options.pid
        let spu = await Spu.getDetail(pid)
        this.setData({
            spu:spu[0]
        })
    },
})