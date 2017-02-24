# source-map-file-export

读取 Source Map 文件, 导出其中的源码文件

例如: `node source-map-file-export.js test/index.js.map`

导出的文件放在 `source` 目录下面, 例如生成如下的文件

```
source/
└── src/
    └── index/
        └── app.js
```