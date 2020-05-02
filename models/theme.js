//业务对象
import {Http} from "../utils/http";

class Theme {
    themes = []

    async getThemes(data) {
        this.themes = await Http.request({
            url: 'themes',
            data
        })
    }

    getTheme(param) {
        return this.themes.find(v => {
            let k_s = Object.keys(param);
            return v[k_s] === param[k_s]
        })
    }


    async getSpu() {
        return await Http.request({
            url: `spu`
        })
    }

}

export {
    Theme
}