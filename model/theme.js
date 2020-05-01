//业务对象
import {Http} from "../utils/http";

class Theme {
    locationA = 't-1'
    locationE = 't-2'
    locationF = 't-3'
    locationH = 't-4'

    themes = []

    async getThemes(){
        let names = `${this.locationA},${this.locationE},${this.locationF},${this.locationH}`
        this.themes = await Http.request({
            url: 'themes',
            data: {
                names
            }
        })
    }

    async getHomeLocationA() {
        return this.themes.find(v => v.name === this.locationA)
    }

    async getHomeLocationE() {
        return this.themes.find(v => v.name === this.locationE)
    }

}

export {
    Theme
}