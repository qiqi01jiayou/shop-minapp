import {Cell} from "./cell";
import {Joiner} from "../../models/joiner";

class SkuPending {

    pending = []
    size

    init(sku) {
        for (let i = 0; i < sku.specs.length; i++) {
            let cell = new Cell(sku.specs[i])
            this.insertCell(cell, i)
        }
    }

    constructor(size) {
        this.size = size
    }

    getSkuCode() {
        let joiner = new Joiner('#')
        this.pending.forEach(cell => {
            let cellCode = cell.spec.key_id + '-' + cell.spec.value_id
            joiner.join(cellCode)
        })
        return joiner.getStr()
    }

    getCurrentSpecValues() {
        let values = this.pending.map(cell => {
            return cell ? cell.spec.value : null
        })
        return values
    }

    getMissingSpecKeysIndex() {
        let keysIndex = []
        for (let i = 0; i < this.size; i++) {
            if(!this.pending[i]){
                keysIndex.push(i)
            }
        }
        return keysIndex
    }


    insertCell(cell, x) {
        this.pending[x] = cell
    }

    removeCell(x) {
        this.pending[x] = null
    }

    //确认完整规格
    isIntact() {
        for (let i = 0; i < this.size; i++) {
            if (this._isEmptyPart(i)) {
                return false
            }
        }
        return true
    }
    _isEmptyPart(index) {
        return !this.pending[index]
    }


    findSelectedCellByX(x) {
        return this.pending[x]
    }

    isSelected(cell, x) {
        let pendingCell = this.pending[x]
        if (!pendingCell) {
            return false
        }
        return cell.id === pendingCell.id
    }
}

export {
    SkuPending
}