import {SkuCode} from "./sku-code";
import {CellStatus} from "../../core/enum";
import {SkuPending} from "./sku-pendding";
import {Joiner} from "../../models/joiner";

class Judger {

    fenceGroup
    pathDict = []
    skuPending

    constructor(fenceGroup) {
        this.fenceGroup = fenceGroup
    }

    init() {
        this._initPathDict()
        this._initSkuPending()
    }

    isSkuIntact() {
        return this.skuPending.isIntact()
    }

    _initPathDict() {
        this.fenceGroup.spu.sku_list.forEach(v => {
            let skuCode = new SkuCode(v.code);
            this.pathDict.push(...skuCode.segments)
        })
    }

    _initSkuPending() {
        let specsLength = this.fenceGroup.fences.length
        this.skuPending = new SkuPending(specsLength)
        let defaultSku = this.fenceGroup.getDefaultSku()
        if (!defaultSku){
            return
        }
        this.skuPending.init(defaultSku)
        this._initSelectedCell()
        this.judge(null,null,null,true)
    }

    judge(cell, x, y,isInt=false) {
        if (!isInt) {
            this._changeCurrentCellStatus(cell, x, y)
        }
        this.fenceGroup.eachCell((cell, x, y) => {
            let path = this._findPotentailPath(cell, x, y)
            if (!path) {
                return
            }
            let isIn = this._isInDict(path)
            if (isIn) {
                this.fenceGroup.setCelStatusByXY(x, y, CellStatus.WAITING)
            } else {
                this.fenceGroup.setCelStatusByXY(x, y, CellStatus.FORBIDDEN)
            }
        })
    }


    getDeterminateSku() {
        let code = this.skuPending.getSkuCode()
        let sku = this.fenceGroup.getSku(code)
        return sku
    }
    getCurrentValues() {
        return this.skuPending.getCurrentSpecValues()
    }

    getMissingKeys() {
        let missingKeysIndex = this.skuPending.getMissingSpecKeysIndex()
        return missingKeysIndex.map(i => {
            return this.fenceGroup.fences[i].title
        })
    }



    _initSelectedCell() {
        this.skuPending.pending.forEach(cell => {
            this.fenceGroup.setCellStatusById(cell.id, CellStatus.SELECTED)
        })
    }


    _isInDict(path) {
        return this.pathDict.includes(path)
    }


    _findPotentailPath(cell, x, y) {
        let joiner = new Joiner('#')
        for (let i = 0; i < this.fenceGroup.fences.length; i++) {
            let selected = this.skuPending.findSelectedCellByX(i)
            if (x === i) {
                // 当前行
                // cell id 1-42
                if (this.skuPending.isSelected(cell, x)) {
                    return
                }
                let cellCode = this._getCellCode(cell.spec)
                joiner.join(cellCode)
            } else {
                // 其他行
                if (selected) {
                    let selectedCellCode = this._getCellCode(selected.spec)
                    joiner.join(selectedCellCode)
                }
            }
        }
        return joiner.getStr()
    }

    _getCellCode(spec) {
        return spec.key_id + '-' + spec.value_id
    }

    _changeCurrentCellStatus(cell, x, y) {
        if (CellStatus.WAITING === cell.status) {
            this.fenceGroup.setCelStatusByXY(x, y, CellStatus.SELECTED)
            this.skuPending.insertCell(cell, x)
        } else if (CellStatus.SELECTED === cell.status) {
            this.fenceGroup.setCelStatusByXY(x, y, CellStatus.WAITING)
            this.skuPending.removeCell(x)
        }
    }

}

export {
    Judger
}