/*规格类别组*/
import {Matrix} from "./matrix";
import {Fence} from "./fence";
import {CellStatus} from "../../core/enum";

class FenceGroup {
    matrix
    fences = []
    skuList
    spu

    constructor(spu) {
        let x = []
        this.spu = spu
        this.skuList = spu.sku_list
        this.skuList.forEach(v => {
            x.push(v.specs)
        })
        this.matrix = new Matrix(x)
    }

    getDefaultSku() {
        let defaultSkuId = this.spu.default_sku_id
        if (!defaultSkuId) return
        return this.skuList.find(v => v.id === defaultSkuId)
    }

    init() {
        this._initFences()
    }

    getSku(skuCode) {
        let fullSkuCode = this.spu.id + '$' + skuCode
        let sku = this.spu.sku_list.find(s => s.code === fullSkuCode)
        return sku || null
    }


    //存在可视规格
    _hasSketchFence() {
        return this.spu.sketch_spec_id
    }

    //是可视规格
    _isSketchFence(fenceId) {
        return this.spu.sketch_spec_id === fenceId
    }

    _initFences() {
        let transpose = this.matrix.transpose();
        transpose.forEach(v => {
            let fence = new Fence(v)
            fence.init()
            //可视
            if(this._hasSketchFence() && this._isSketchFence(fence.id)){
                fence.setFenceSketch(this.skuList)
            }
            this.fences.push(fence)
        })
    }

    setCellStatusById(cellId, status) {
        this.eachCell((cell) => {
            if (cell.id === cellId) {
                cell.status = status
            }
        })
    }

    setCelStatusByXY(x, y, status) {
        this.fences[x].cells[y].status = status
    }

    eachCell(cb) {
        for (let i = 0; i < this.fences.length; i++) {
            for (let j = 0; j < this.fences[i].cells.length; j++) {
                const cell = this.fences[i].cells[j]
                cb(cell, i, j)
            }
        }
    }


}

export {
    FenceGroup
}