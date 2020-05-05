/*规格项*/
import {CellStatus} from "../../core/enum";

class Cell {
    id
    value
    status= CellStatus.WAITING
    spec

    constructor(spec) {
        this.value = spec.value
        this.id = spec.value_id
        this.spec = spec
    }

    getCellCode() {
        return this.spec.key_id + '-' + this.spec.value_id
    }



}

export {
    Cell
}