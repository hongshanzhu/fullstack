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
