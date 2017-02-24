/**
 * 读取 Source Map 文件, 导出其中的源码文件
 * 
 * 例如: node source-map-file-export.js test/index.js.map
 * 
 * 导出的文件放在 source 目录下面
 */
var path = require('path');
var fs = require('fs');

// 写入文件时, 如果上级文件夹不存在, 则会自动创建这个文件夹
var filendir = require('filendir');

var dist = './source/';

function parseSourceMapFile(file) {
    var mapFilePath = path.resolve(file);
    var sourceMapFileContent = fs.readFileSync(mapFilePath);
    var sourceMap = JSON.parse(sourceMapFileContent);

    console.log('---------------------');
    console.log('mapFilePath', mapFilePath);
    console.log('version', sourceMap.version);
    console.log('file', sourceMap.file);
    console.log('sources.length', sourceMap.sources.length, sourceMap.sourcesContent.length);
    console.log('dist', dist);

    return sourceMap;
}

function writeSource(sourceMap) {
    sourceMap.sources.forEach(function(fileName, index) {
        // 特别关照下 webpack, 否则无法创建这样的文件夹
        fileName = fileName.replace('webpack:///', '');
        var fileContent = sourceMap.sourcesContent[index];

        filendir.writeFileSync(dist + fileName, fileContent);
    });
}

writeSource(parseSourceMapFile(process.argv[2]));