# [Day8] 利用TypeScript重构登陆注册功能项目

[TOC]


## 要求

- 了解Express框架
- 了解node.js常用模块：express，body-parser，mysql
- 了解express Router
- 了解HTML form表单
- 了解MySQL Server及安装使用
- 了解SQLyog使用
- 了解**Typescript**, 了解import, export, 了解interface, class...
- 了解**ES6**语法:箭头函数, async, await, promise...
- 了解**tslint**

## 环境

1. OS: Win10
2. Node.js: v12.19.0
3. Express: v4.17.1
5. Yarn: v1.22.10
6. VScode IDE
6. body-parser：1.19.0
7. mysql: 2.18.1
8. MySQL Server：5.7
9. SQLyog:V12.9
10. **nodemon**
11. **morgan**

## 准备

### [TypeScript](https://www.tslang.cn/)

> TypeScript是JavaScript的超集，具有可选的类型并可以编译为JavaScript。
>
> TypeScript的**设计目的**应该是解决JavaScript的“痛点”：弱类型和没有命名空间，导致很难模块化，**不适合开发大型程序**。另外它还提供了一些语法糖来帮助大家更方便地实践**面向对象的编程**。

### [nodemon](https://github.com/remy/nodemon)

Nodemon 是一款非常实用的工具，用来监控你 node.js 源代码的任何变化和**自动重启你的服务器**

### [morgan](https://github.com/expressjs/morgan#readme)

HTTP request **logger** middleware for node.js

## 实战

完整代码github:https://github.com/hongshanzhu/fullstack.git

### 前端

3个page, index.html，

#### index.html

```html
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8">
			<title>登陆注册</title>
			<link rel="stylesheet" type="text/css" href="/stylesheets/style.css" />
		</head>
		<body>
			<a href="./register.html">注册</a>
			<a href="./login.html">登录</a>
		</body>
	</head>
</html>
```

#### login.html

```html
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8">
			<title>登陆注册</title>
			<link rel="stylesheet" type="text/css" href="/stylesheets/style.css" />
		</head>
		<body>
			<form action="/login" method="GET" >        
				<label for="">账号:</label> 
				<input name="user" type="text" placeholder="请输入账号"> 
				<br> 
				<label for="">密码:</label> 
				<input type="password" name="password" placeholder="请输入密码"> 
				<br>
				<input type="submit"  value="登录">
			</form>
		</body>
	</head>
</html>
```

#### register.html

```html
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8">
			<title>登陆注册</title>
			<link rel="stylesheet" type="text/css" href="/stylesheets/style.css" />
		</head>
		<body>
			<form action="/register" method="POST">
				<label for="">账号:</label> 
				<input name="user" type="text" placeholder="请输入账号">
				<br> 
				<label for="">密码:</label> 
				<input name="psw" type="password" placeholder="请输入密码"> 
				<br> 
				<label for="">重复密码:</label> 
				<input name="pswa" type="password" placeholder="请重复密码"> 
				<br> 
				<input type="submit" value="注册">
			</form>
		</body>
	</head>
</html>
```

### 后端

#### index.ts

```typescript
import {Server} from './server'

new Server().getServer().listen(3000,()=>{
    console.log("Server running at localhost:3000");
});
```

#### server.ts

```typescript
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as router from './routers';
import * as path from 'path';
import * as morgan from 'morgan';

export class Server {
    private app:express.Express;
    
    constructor(){
        this.app = express();
        this.app.use(bodyParser.json({ limit: '5mb' }));
        this.app.use(bodyParser.urlencoded({ extended: true }));
        // Show routes called in console during development
        if (process.env.NODE_ENV === 'development') {
            this.app.use(morgan('dev'));
        }
        
        this.app.use(express.static(path.join(__dirname, 'views')));        
        this.app.use('/', router.router);
    }
    public getServer(): express.Express {
        return this.app;
    }
}
```

#### Router

router/index.ts, 调用封装好的数据库接口：queryUer, addUser

```typescript
import * as express from 'express';
import * as dao from '../dao';

export const router = express.Router();

router.get("/login", async (req: express.Request, res: express.Response, next: any) => {
    console.dir(req.query);
    try {
        let result = await dao.queryUser({ username: req.query.user as string })
        if (!result) {
            res.send(`${req.query.user}:登陆失败,检查登陆信息是否正确`);
            return
        }
        if (result && result.password == req.query.password) {
            res.send(`${req.query.user}:登陆成功`);
        } else {
            res.send(`${req.query.user}:登陆失败,检查登陆信息是否正确`);
        }
    } catch (error) {
        console.log(error);
        res.send(`${req.body.user}: 登陆失败`);
    }
})

router.post("/register", async (req: express.Request, res: express.Response, next: any) => {
    console.dir(req.body);
    try {
        if (req.body.psw == req.body.pswa) {
            let result: any = await dao.addUser({ username: req.body.user, password: req.body.psw });
            if (!result) {
                console.log(result);
                res.send(`${req.body.user}: 注册失败:,检查登陆信息是否正确`);
            } else {
                res.send(`${req.body.user}: 注册成功`);
            }
        } else {
            res.send(`${req.body.user}: 注册失败:,检查登陆信息是否正确`);
        }
    } catch (error) {
        console.log(error);
        res.send(`${req.body.user}: 注册失败`);
    }
})
```

#### 数据库接口db.js

dao/db.ts

```typescript
import { mysqlClient } from './mysql';
import { UserInfo } from '../common'

export async function addUser(userInfo: UserInfo) {
    console.log("addUser:" + userInfo);
    var sql = `insert into user(username,password) values('${userInfo.username}','${userInfo.password}')`;
    console.log("sql:" + sql);
    return await mysqlClient.query(sql);
}

export async function queryUser(userInfo: UserInfo) {
    console.log("queryUser:" + userInfo);
    var sql = `select * from user where username='${userInfo.username}'`;
    console.log("sql:" + sql);
    let record: any = await mysqlClient.query(sql);
    return record && record.length > 0 ? record[0] : undefined;
}

```

dao/mysql.ts

```typescript
import * as mysql from 'mysql';

class MysqlClient{
    private readonly pool:mysql.Pool;
    constructor(){
        this.pool =  mysql.createPool({
            host: "localhost",
            user: "root",
            password: "110120",
            database: "test"
        });
    }
    /**
     * query
     */
    public async query(sql:string){
        return new Promise((resolve, reject) => {
            this.pool.getConnection(function (err, connection) {
                if (err) {
                    reject(err)
                } else {
                    connection.query(sql, (err, rows) => {
                        if (err) {
                            reject(err)
                        } else {
                            resolve(rows)
                        }
                        connection.release();
                    });
                }
            });
        });
    }
}
export const mysqlClient = new MysqlClient();
```
### add module

```shell
yarn add typescript
yarn add nodemon
yarn add morgan
yarn add @types/nodemon
yarn add @types/morgan
yarn add @types/mysql
```
### 运行

```shell
export NODE_ENV=development
yarn run dev
```

### 结果及演示

浏览器看效果及整个过程。

![利用TypeScript重构登陆注册功能项目](G:\project\fullstack\bolg\fullstack\day8\利用TypeScript重构登陆注册功能项目.gif)