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
