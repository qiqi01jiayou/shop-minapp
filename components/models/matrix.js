class Matrix {
    m = []

    constructor(obj) {
        this.m = obj
    }


    get rowNum() {
        return this.m.length
    }

    get colNum() {
        return this.m[0].length
    }

    //转置
    transpose() {
        let desArr = []
        for (let j = 0; j < this.colNum; j++) {
            desArr[j] = []
            for (let i = 0; i < this.rowNum; i++) {
                desArr[j][i] = this.m[i][j]
            }
        }
        return desArr
    }


}

export {
    Matrix
}