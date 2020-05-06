import {Http} from "../utils/http";

class Categories {
    //一级分类
    roots = []
    //二级分类
    subs = []

    /**
     * 获取所有分类数据
     * @returns {Promise<void>}
     */
    async getAll() {
        let data = await Http.request({
            url: `categories`
        })
        this.roots = data.roots
        this.subs = data.subs
    }

    getRoots(){
        return this.roots
    }

    /**
     * 根据id获取所有子sub
     * @param rootId
     * @returns {*[]}
     */
    getSubsByRoot(rootId){
        return this.subs.filter(v => v.parent_id === rootId)
    }

    /**
     * 根据id获取root
     * @param roots
     */
    getCurrentRoot(rootId){
        let defaultRoot = this.roots.find(v=>v.id===rootId);
        if(!defaultRoot){
            defaultRoot = this.roots[0]
        }
        return defaultRoot
    }

}

export {
    Categories
}