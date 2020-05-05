import {Http} from "../utils/http";

class SaleExplain {


    static async getFixed() {
        let explain = await Http.request({
            url: 'explain'
        })
        return explain.map(v => v.text)
    }
}

export {
    SaleExplain

}