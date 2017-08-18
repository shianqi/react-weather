# 大象声科网站

## 预览
[elevoc.com v1.0](http://www.elevoc.com/development/)

[elevoc.com v1.1](http://www.elevoc.com/development/v2/)

[elevoc.com v1.2](http://www.elevoc.com/development/v3/)


## 开发
```
$ npm run dev
```

## 打包发布
```
$ npm run build
```

## 项目目录
```
.
├── docs ................................ 文档目录
│   ├── CHANGELIST.md ................... 项目变更说明
│   └── Font.md ......................... 字体说明
├── src ................................. 源代码主目录
│   ├── components ...................... 组件
│   ├── .babelrc ........................ bable配置文件
│   └── index.jsx ....................... 项目入口文件
├── template ............................ 模板目录
│   ├── favicon.ico ..................... favicon.ico
│   └── index.tmpl.html ................. index.html 模版
├── .babelrc ............................ bable配置文件
├── .eslintrc.js ........................ eslint配置文件
├── .gitgnore ........................... gitgnore
├── package-lock.json ................... lock文件
├── package.json ........................ package.json
├── README.md ........................... 主文档
├── webpack.config.dll.js ............... webpack-dll配置
├── webpack.config.js ................... webpack开发配置文件
├── webpack.config.polyfils.js .......... polyfils配置
└── webpack.config.production.js ........ webpack生产配置文件
```

## 所用技术
* npm
* webpack
* eslint
* react
* babel
* react-router

## 开发环境
|环境|版本|
|---|---|
|Node.js|v8.2.1|
|npm|v5.3.0|

## 更新字体
为了优化项目大小，只引入需要文字的字体。采用 [iconfont](http://iconfont.cn/webfont/#!/webfont/index) 进行字体引入，将项目所需字体放在 [Font.md](./docs/Font.md) 中,所用字体为`思源黑体-常规`

## 更新日志
[CHANGELIST.md](./docs/CHANGELIST.md)
