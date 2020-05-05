/*规格类别*/
import {Cell} from "./cell";

class Fence {
    specs
    cells = []
    id
    title


    constructor(specs) {
        this.specs = specs
        this.id = specs[0].key_id
        this.title = specs[0].key
    }

    init() {
        this._initCells()
    }

    _initCells() {
        this.specs.forEach(v => {
            if(!this.cells.some(s => {return s.id === v.value_id})){
                let cell = new Cell(v)
                this.cells.push(cell)
            }
        })
    }

    setFenceSketch(skuList) {
        this.cells.forEach(c=>{
            this._setCellSkuImg(c, skuList)
        })
    }

    _setCellSkuImg(cell, skuList) {
        let specCode = cell.getCellCode()
        let matchedSku = skuList.find(s=>s.code.includes(specCode))
        if(matchedSku){
            cell.skuImg = matchedSku.img
        }
    }

}

export {
    Fence
}