import {
    Http
} from "../utils/http";

class Activity {
    static getHomeLocationD() {
        return Http.request({
            url: `activity`
        })
    }
}

export {
    Activity
}