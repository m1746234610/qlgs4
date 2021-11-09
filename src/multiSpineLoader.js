import * as PIXI from "pixi.js";
let loader = PIXI.loader;
function combineOne(name,oldResource,json,altas){
    var resource = {};
    var imageOptions = {
        crossOrigin: resource.crossOrigin,
        metadata: null,
        parentResource: oldResource
    };
    var namePrefix = name + '_atlas_page_';
    return new Promise((resolve)=>{
        var baseUrl = oldResource.url.substr(0, oldResource.url.lastIndexOf('/') + 1);
        baseUrl = baseUrl.replace(oldResource.baseUrl, '');
        // console.log(PIXI.spine,"PIXI.spine.");
        var adapter = PIXI.spine.imageLoaderAdapter(loader, namePrefix, baseUrl, imageOptions);
        var createSkeletonWithRawAtlas = function (rawData) {
            new PIXI.spine.core.TextureAtlas(rawData, adapter, function (spineAtlas) {
                if (spineAtlas) {
                    var spineJsonParser = new PIXI.spine.core.SkeletonJson(new PIXI.spine.core.AtlasAttachmentLoader(spineAtlas));
                    resource.spineData = spineJsonParser.readSkeletonData(json);
                    resource.spineAtlas = spineAtlas;
                    resource.key = json._key;
                    resolve(resource);
                }
            });
        };
        createSkeletonWithRawAtlas(altas);
    });
    
}
function isJson(resource) {
    return resource.type === PIXI.loaders.Resource.TYPE.JSON;
}
function combineMiddleWare(resource, next){
    if (!resource.data ||
        !isJson(resource) ||
        !resource.data.isCombine) {
        return next();
    }
    var atlasPath = resource.url;
    var queryStringPos = atlasPath.indexOf('?');
    if (queryStringPos > 0) {
        atlasPath = atlasPath.substr(0, queryStringPos);
    }
    atlasPath = atlasPath.substr(0, atlasPath.lastIndexOf('.')) + '.atlas';
    if (resource.metadata && resource.metadata.spineAtlasFile) {
        atlasPath = resource.metadata.spineAtlasFile;
    }
    atlasPath = atlasPath.replace(this.baseUrl, '');
    var atlasOptions = {
        crossOrigin: resource.crossOrigin,
        xhrType: PIXI.loaders.Resource.XHR_RESPONSE_TYPE.TEXT,
        metadata: null,
        parentResource: resource
    };
    this.add(resource.name + '_atlas', atlasPath, atlasOptions, function (atlasResource) {
        if (!atlasResource.error) {
            var arr = atlasResource.data.split("=====");
            arr.shift();
            var arrPromise = [];
            for(var i = 0 ; i < arr.length;i+=2){
                arrPromise.push(combineOne(arr[i],resource,resource.data[arr[i]],arr[i+1]));
            }
            Promise.all(arrPromise).then((data)=>{
                data.forEach(ele=>{
                    loader.resources[ele.key] = ele;
                });
                next(); 
            });
        }
        else {
            next();
        }
    });
}
loader.use(combineMiddleWare);