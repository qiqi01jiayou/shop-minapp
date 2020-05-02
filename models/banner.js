import {Http} from "../utils/http";

class Banner {
    banner = []

    async getBanners(data={}) {
        this.banner = await Http.request({
            url: `banner`,
            data
        })
    }

    getBanner(param) {
        return this.banner.find(v=>{
            let k_s = Object.keys(param);
            return v[k_s] === param[k_s]
        })
    }

}

export {
    Banner
}