import {Http} from "../utils/http";

class Activity{
    static async getHomeLocationD(){
        return await Http.request({
            url:`activity`
        })
    }
}

export {
    Activity
}