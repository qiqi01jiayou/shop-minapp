// pages/search/search.js
import {HistoryKeyword} from "../../models/history-keyword";
import {Tag} from "../../models/tag";
import {Search} from "../../models/search";
import {showToast} from "../../utils/ui";

const historyKeyword = new HistoryKeyword()
Page({

    /**
     * 页面的初始数据
     */
    data: {},

    /**
     * 生命周期函数--监听页面加载
     */
    async onLoad(options) {
        let historyTags = historyKeyword.get();
        let hotTags = await Tag.getSearchTags()
        this.setData({
            historyTags,
            hotTags
        })
    },
    /**
     * 搜索关键字存到本地缓存
     * @param event
     */
    async onSearch(event) {
        this.setData({
            search:true,
            items:[]
        })
        let keyword = event.detail.value || event.detail.name
        console.log(keyword,'keyword');
        if(!keyword){
            showToast('请输入关键字')
            return
        }
        historyKeyword.save(keyword)
        this.setData({
            historyTags: historyKeyword.get()
        })
        //查询
        let paging = Search.search(keyword)
        /*wx.lin.showLoading({
            color:'#157658',
            type:'flash',
            fullScreen:true // 全屏模式，不需要你去定位
        })*/
        let data = await paging.getMoreData();
        //wx.lin.hideLoading()
        this.bindItems(data)
    },

    bindItems(data) {
        if (data.accumulator.length) {
            this.setData({
                items: data.accumulator
            })
        }
    },
    /**
     * 取消搜索
     * @param event
     */
    onCancel(event){
        this.setData({
            search:false
        })
    },
    /**
     * 清除历史关键字
     * @param event
     */
    clearHistory(event) {
        historyKeyword.clear()
        this.setData({
            historyTags: []
        })
    }
})