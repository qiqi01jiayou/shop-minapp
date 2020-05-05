// components/spec/index.js
import {FenceGroup} from "../models/fence-group";
import {Judger} from "../models/judger";
import {Spu} from "../../models/spu";
import {Cell} from "../models/cell";

Component({
    /**
     * 组件的属性列表
     */
    properties: {
        spu: Object
    },

    lifetimes: {
        attached() {
        }
    },

    observers: {
        "spu"(spu) {
            if (!spu) return
            if (Spu.isNoSpec(spu)) {
                this.setData({
                    noSpec: true,
                    //    isSkuIntact:true
                })
                this.bindSkuData(spu.sku_list[0])
                return
            }
            let fenceGroup = new FenceGroup(spu)
            fenceGroup.init()
            let j = new Judger(fenceGroup)
            j.init()
            this.data.jud = j
            let defaultSku = fenceGroup.getDefaultSku();
            if (defaultSku) {
                this.bindSkuData(defaultSku)
            } else {
                this.bindSpuData()
            }
            this.bindTipData()
            this.bindInitData(fenceGroup)
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        jud: Object,
        previewImg: String,
        title: String,
        price: Object,
        discountPrice: Object,
        stock: Object,
        isSkuIntact: Object,
    },

    /**
     * 组件的方法列表
     */
    methods: {
        bindSpuData() {
            let spu = this.properties.spu
            this.setData({
                previewImg: spu.img,
                title: spu.title,
                price: spu.title,
                discountPrice: spu.discount_price,
            })
        },
        bindSkuData(sku) {
            this.setData({
                previewImg: sku.img,
                title: sku.title,
                price: sku.price,
                discountPrice: sku.discount_price,
                stock: sku.stock
            })
        },
        bindTipData() {
            this.setData({
                isSkuIntact: this.data.jud.isSkuIntact(),
                currentValues: this.data.jud.getCurrentValues(),
                missingKeys: this.data.jud.getMissingKeys()
            })
        },
        bindInitData(fenceGroup) {
            this.setData({
                fences: fenceGroup.fences,
                isSkuIntact: this.data.jud.isSkuIntact()
            })
        },
        onCellTap(event) {
            let cell = event.detail.cell
            let x = event.detail.x
            let y = event.detail.y

            let cell1 = new Cell(cell.spec)
            cell1.status = cell.status

            let jud = this.data.jud
            jud.judge(cell1, x, y)
            let skuIntact = jud.isSkuIntact()
            if (skuIntact) {
                let currentSku = jud.getDeterminateSku()
                this.bindSkuData(currentSku)
                // this.setStockStatus(currentSku.stock,this.data.currentSkuCount)
            }
            this.bindTipData()
            this.setData({
                fences: jud.fenceGroup.fences
            })
        },
        setStockStatus(stock, currentCount) {
            this.setData({
                outStock: this.isOutOfStock(stock, currentCount)
            })
        },
        isOutOfStock(stock, currentCount) {
            return stock < currentCount
        },
    }
})
