import {Paging} from "../utils/paging";

class SpuPaging {

    static getLatestPaging(...data) {
        return new Paging(...data)
    }
}

export {
    SpuPaging

}