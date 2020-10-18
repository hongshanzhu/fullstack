# [Day3] Node.js利用Express托管静态文件

[TOC]

## 要求

- 了解Express框架
- 了解JavaScript和html,CSS基础知识
- 了解node.js常用模块：express
- 了解require, exports

## 环境

1. OS: Win10
2. Node.js: v12.19.0
3. Notepad++
4. Express: v4.17.1
5. Yarn: v1.22.10

## 实战

### index.html

编写一个简单index.html文件，新建一个静态文件存放的public目录.把index.html文件放到此文件夹，引入style.css

```html
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8">
			<title>Hello HTML</title>
			<link rel="stylesheet" type="text/css" href="/stylesheets/style.css" />
		</head>
		<body>
			<h1>看到这句话表示html页面成功显示了。</h1>
		</body>
	</head>
</html>
```

### style.css

新建stylesheets文件夹，在里面新建一个style.css文件

```css
body {
  padding: 50px;
  font: 14px "Lucida Grande", Helvetica, Arial, sans-serif;
  color: #00B7FF;
}

```

### index.js

编写index.js

```javascript
var app=require("./server")

app.listen(3000);
console.log("Server running at localhost:3000");
```

### server.js

编写server.js，直接使用express的中间件托管静态文件目录

```javascript
var express=require("express");
var app=express();

app.use(express.static('public'))

module.exports = app;
```

### install Express

不在使用npm，用**Yarn**替代。

Yarn: Fast, reliable, and secure dependency management. 详细参考[官网](https://github.com/yarnpkg/yarn)

```shell
npm install yarn -g
yarn add express
```

安装完后，除了node_modules外，出现[package.json](https://docs.npmjs.com/files/package.json) 和[yarn.lock](https://classic.yarnpkg.com/en/docs/yarn-lock/) 文件。这2个文件的作用。

1. package.json

   在Node.js中，模块是一个库或框架，也是一个Node.js项目。Node.js项目遵循模块化的架构，当我们创建了一个Node.js项目，意味着创建了一个模块，这个**模块的描述文件**，被称为package.json

2. yarn.lock

   Yarn 需要准确存储每个安装的依赖是哪个版本。 为了做到这样，Yarn 使用一个你项目根目录里的 yarn.lock 文件

### 运行index.js

```shell
node index.js
```

### 结果及演示

浏览器看效果及整个过程

![Node.js利用Express 托管静态文件](G:\project\fullstack\bolg\day3\Node.js利用Express 托管静态文件.gif)





