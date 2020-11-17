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