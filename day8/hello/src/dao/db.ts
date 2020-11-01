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
