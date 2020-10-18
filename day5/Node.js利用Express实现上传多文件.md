# [Day5] Node.js利用Express实现上传多个文件并重命名文件

[TOC]

## 要求

- 了解Express框架
- 了解JavaScript和html,CSS基础知识
- 了解node.js常用模块：express
- **了解multer中间件**
- **了解express Router**

## 环境

1. OS: Win10
2. Node.js: v12.19.0
3. Express: v4.17.1
5. Yarn: v1.22.10
5. **Multer: v1.4.2**
6. **使用VScode IDE**

## 原理

[**Multer**](https://github.com/expressjs/multer)

使用`.array(fieldname[, maxCount])`和`DiskStorage`实现多文件及文件存储命名。

## 实战

**NOTE**:  *基于**Day4**的工程，只列出变化的部分*,重新组织代码结构

### index.html

增加3个file type

```html
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8">
			<title>Hello HTML</title>
			<link rel="stylesheet" type="text/css" href="/stylesheets/style.css" />
		</head>
		<body>
			<h3>单文件上传：</h3>
			选择一个文件上传: <br />
			<form action="/file/uploader" enctype="multipart/form-data" method="post">
				<input type="file" name="image" size="50" />
				<br />
				<button type="submit">上传</button>
			</form>
		</body>
	</head>
</html>
```

### server.js

编写server.js，直接使用express的中间件托管静态文件目录,指定上传文件目录**/public/upload/**。实现POST API：/file/uploader。

```javascript
var express=require("express");
var path=require("path");
var multer=require("multer");

var app=express();

const UPLOADPATH =path.join( __dirname , '/public/upload/');

app.use(multer({ dest: UPLOADPATH}).array('image'));
app.use(express.static('public'))
app.post("/file/uploader", function(req,res){
    console.dir(req.files);
    var resObj = {
        code: 1,
        des: '上传成功'
    };
    res.send(resObj);
})

module.exports = app;
```

### install multer

```shell
yarn add multer
```

### 运行index.js

```shell
node index.js
```

### 结果及演示

浏览器看效果及整个过程，*本次没有修改原始文件名*

![Node.js利用Express实现上传单文件](G:\project\fullstack\bolg\day4\Node.js利用Express实现上传单文件.gif)





