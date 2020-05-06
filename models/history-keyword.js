/*
单例
 */
class HistoryKeyword {
    static KEY_WORDS = 'keywords'
    static MAX_ITEM_COUNT = 20
    keyWords = []

    constructor() {
        this.keyWords = this._getLocalKeyWords() || []
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