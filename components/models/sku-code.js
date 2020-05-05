import {combination} from "../../utils/util";

class SkuCode {
    code
    spuId
    segments = []

    constructor(code) {
        this.code = code
        this._splitToSegments()
    }

    _splitToSegments() {
        let spuAndSpec = this.code.split('$')
        this.spuId = spuAndSpec[0]

        let specCodeArray = spuAndSpec[1].split('#')

        for (let i = 1; i <= specCodeArray.length; i++) {
            let segment =  combination(specCodeArray, i)
           // console.log(segment,'segment');
            let newSegment =  segment.map(v=>{
                return v.join('#')
            })
            this.segments.push(...newSegment)
          //  console.log(newSegment,'newSegment');
        }

    }


}

export {

    SkuCode
}