const fs = require('fs');
const screenPath=require("../test_conf.json").screenPath
exports.screen =screen;
async function screen(encodedString,test) {
    await fs.writeFileSync(screenPath+'/'+test.parent.title+'-'+test.title+'.png', encodedString, 'base64');
}

exports.screenSetName =screenSetName;
async function screenSetName(encodedString,name) {
    await fs.writeFileSync(screenPath+'/'+name+'.png', encodedString, 'base64');
}

exports.screenFolder =screenFolder;
async function screenFolder () {
    if (!fs.existsSync(screenPath))
        await fs.mkdirSync(screenPath)
}
