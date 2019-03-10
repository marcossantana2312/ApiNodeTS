import { Request, Response } from 'express';
import * as jwt from 'jwt-simple';
import * as HTTPStatus from 'http-status';
import * as bcrypt from 'bcrypt';

const config = require('../config/env/config')();

export default function authSuccess(res: Response, credentials: any, data: any){
    const isMatch = bcrypt.compareSync(credentials.password, data.password);
    
    if(isMatch){
        const payload = {id: data.id};
        let token = jwt.encode(payload, config.secret) 
        console.log(token);
        
        res.json({
            token: token
        });
    }else{
        res.sendStatus(HTTPStatus.UNAUTHORIZED)
    }
}