import {promisic} from "./util";
import {px2rpx} from "../miniprogram_npm/lin-ui/utils/util";

const getSystemSize = async function () {
    let res = await wx.getSystemInfo()
    return {
        windowHeight: res.windowHeight,
        windowWidth:res.windowWidth,
        screenWidth: res.screenWidth,
        screenHeight: res.screenHeight,
    }
}

const getWindowHeight = async function() {
    let res = await getSystemSize();
    return px2rpx(res.windowHeight);
}

export {
    getSystemSize,
    getWindowHeight
}