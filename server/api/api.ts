import * as express from 'express';
import { Application} from 'express';
import * as morgan from 'morgan';
import * as bodyParser from 'body-parser';
import Routes from './routes/routes'
import { errorHandlerApi } from '../api/errorHandlerApi';
import {Auth} from '../auth'

class Api{

    public express: Application;
    private auth: Auth;
    
    constructor(){
        this.express = express();
        this.middleware();
        this.auth = new Auth()
    }

    middleware(): void{
        this.express.use(morgan('dev'));
        this.express.use(bodyParser.urlencoded({extended: true}));
        this.express.use(bodyParser.json());
        this.express.use(errorHandlerApi);
        this.express.use(this.auth.config().initialize());
        this.router(this.express, this.auth);
    }

    private router(app: Application, auth: any): void{
        Routes.initRoutes(app, auth);
    }
}

export default new Api().express;