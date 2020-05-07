/*
单例
 */
const Singleton = (function () { var instance = null; /* class _Singleton */ })()

class HistoryKeyword {
    static KEY_WORDS = 'keywords'
    static MAX_ITEM_COUNT = 20
    keyWords = []

    constructor() {
        if(typeof HistoryKeyword.instance==='object'){
            return HistoryKeyword.instance
        }
        this.keyWords = this._getLocalKeyWords() || []
        HistoryKeyword.instance = this
        return this
    }

    save(keyword) {
        let existsItem = this.keyWords.some(v => v === keyword)
        if (existsItem) return
        if (this.keyWords.length > HistoryKeyword.MAX_ITEM_COUNT) {
            this.keyWords.pop()//剔除最后
        }
        this.keyWords.unshift(keyword)//加入最前
        this._refreshLocal()
    }

    get() {
        return this.keyWords
    }

    clear() {
        this.keyWords = []
        this._refreshLocal()
    }

    _refreshLocal() {
        wx.setStorageSync(HistoryKeyword.KEY_WORDS, this.keyWords)
    }

    _getLocalKeyWords() {
        return wx.getStorageSync(HistoryKeyword.KEY_WORDS)
    }

}

export{
    HistoryKeyword
}