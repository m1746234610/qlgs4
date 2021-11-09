const fs = require('fs');
const path = require('path')
const template = process.env.npm_config_dir || process.argv.splice(2)[0];
const recursive = require('recursive-readdir');
console.log("template:",template);
const combineMap = {
  isCombine:true
};
const compute =(relativeDirPath, exts = [], prefix = 'image') =>{
  let absDirPath = path.resolve(relativeDirPath);
  return new Promise((resolve, reject) => {
      let preloadList = [];
      recursive(absDirPath, (err, files) => {
        files.forEach(file => {
          let ext = path.extname(file);
          let filename = path.basename(file, ext);
          let relative =  path.relative(absDirPath, file);
          if (filename == 'combine') return;
          let dir = path.dirname(relative).replace(/\//g, '-');
          let key;
          if (dir == '.') {
            key = prefix + '_' + filename;
          }else {
            key = prefix + '-' + path.dirname(relative).replace(/\//g, '-') + '_' + filename;
          }
          let result = {
            path: (relativeDirPath + relative).replace('/public/' + template + '', '').replace('/public', ''),
            key: key,
            name: filename + ext,
            edit: false
          };
          if (exts.includes(ext.replace('.', ''))) {
            if (ext == '.json' || ext == '.atlas') {
              let combinePath = path.dirname(result.path) + '/' + 'combine' + ext;
              let combineAbsPath = path.dirname(file) + '/' + 'combine' + ext;
              result.level = filename;
              if (ext == '.json') {
                var hasFile = false;
                if(combineMap[combineAbsPath]){
                  hasFile = true;
                }else{
                  combineMap[combineAbsPath] = {};
                }
                combineMap[combineAbsPath][filename] = JSON.parse(fs.readFileSync(file, 'utf-8'));
                combineMap[combineAbsPath][filename]._key = key;
                result.path = combinePath;
                if(!hasFile){
                  preloadList.push(result);
                }
              }
              else {
                combineMap[combineAbsPath] = combineMap[combineAbsPath] || '';
                combineMap[combineAbsPath] += ('=====' + filename + '=====\n' + fs.readFileSync(file, 'utf-8'));
              }
            }
            else {
              preloadList.push(result);
            }
          }
        });
        resolve(preloadList);
      });
  });
}
let resourceDirs = [
    {
        baseSrc: "./public/common/images/",
        exts: ['png', 'jpg'],
        prefix: "image"
    }, {
        baseSrc: "./public/" + template + "/resources/assets/images/",
        exts: ['png', 'jpg'],
        prefix: "image"
    },
    {
        baseSrc: "./public/" + template + "/resources/assets/audios/",
        exts: ['mp3'],
        prefix: "audio"
    },
    {
        baseSrc: "./public/" + template + "/resources/animation/",
        exts: ['json', 'atlas'],
        prefix: "animation"
    }
];
Promise
.all(
  resourceDirs.map((resourceDir,index) =>{
    const exists = fs.existsSync(resourceDir.baseSrc);
    if(exists){
      return compute(resourceDir.baseSrc, resourceDir.exts, resourceDir.prefix)
   }
  })
)
.then((items) => {
  let results = items.reduce((results, item) => {
    return results.concat(item);
  },[]);
  Object.keys(combineMap).forEach(combineFile => {
    if (/\.json$/g.test(combineFile)) {
      combineMap[combineFile].isCombine = true;
      fs.writeFileSync(combineFile, JSON.stringify(combineMap[combineFile]), 'utf-8')
    }
    else {
      fs.writeFileSync(combineFile, combineMap[combineFile], 'utf-8')
    }
  });
  fs.writeFileSync('./public/' + template + '/resources/resource.json', JSON.stringify(results), 'utf-8');
  console.log("资源列表成功生成")
});
