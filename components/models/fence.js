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

}

export {
    Fence
}