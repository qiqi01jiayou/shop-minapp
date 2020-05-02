import { Http } from "../utils/http";

class Category{
  static getHomeLocationC(){
      return Http.request({
        url:`category`
      })
  }
}

export{
  Category
}