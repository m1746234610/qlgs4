import { Sprite } from 'pixi.js';
const PIXI_SPINE = require('pixi-spine');
const multiSpine = require('./multiSpineLoader.js');
const PIXI_SOUND = require('pixi-sound');
const TEMPLATE_DIR = process.env.TEMPLATE_DIR; // 创建的文件的名字
console.log(TEMPLATE_DIR, "PROJECT_NAME");
let resourcePath = '';
if (process.env.NODE_ENV === 'production') {
    resourcePath = '.'
} else {
    resourcePath = TEMPLATE_DIR;
}
let loader = PIXI.loader;
export const PIXI_LOADER = (aRes = [{ name: "resources", fileName: "resource" }]) => {
    if (!window.res) {
        return new Promise((resolve, reject) => {
            aRes.forEach(elememt => {
                console.log(`elememt.name>${elememt.name},elememt.fileName>${elememt.fileName}`)
                loader.add(elememt.name, `./resources/${elememt.fileName}.json`, { crossOrigin: true });
            });
            loader.load(() => {
                aRes.forEach(element => {
                    let resources = PIXI.loader.resources[element.name].data;
                    resources.forEach(value => {
                        try {
                            loader.add(value.key, value.path, { crossOrigin: true });
                        } catch (e) {
                            console.log(value);
                            console.log(e);
                        }
                    });
                });
                loader.load((l, r) => {
                    window.res = r;
                    console.log(r);
                    resolve(r)
                });
                loader.onError.add((e) => {
                    console.log(e, "loader报错了");
                    window.$$templateErrorArr.unshift(e);
                });
                loader.onProgress.add((e) => {
                    console.log("loader加载进程中", e.progress);
                    document.getElementsByClassName('runner')[0].style.width = e.progress * 6.8 / 100 + 'rem';
                });
                loader.onComplete.add((e) => {
                    console.log("loader加载完成");
                    // window.$$templateEndTime  = new Date();
                    //loadin消失
                    setTimeout(() => {
                        document.getElementsByClassName('page-loading')[0].style.display = 'none';
                    }, 500)
                    window.$$templateEndTime = new Date();
                });
            });
        })
    }
}

export const getSound = (resourceStr) => {
    return res[resourceStr].sound;
}
export const getAnimation = (animationName) => {
    return new PIXI.spine.Spine(res[animationName].spineData)
}
export const createSprite = (key) => {
    return new Sprite(res[key].texture);
}
export const getOptionTexture = (resourceJsonStr, texture) => {
    return res[resourceJsonStr].textures[texture];
}