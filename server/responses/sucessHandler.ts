import {Response} from 'express';
import * as HTTPStatus from 'http-status';

export function onSuccess(res: Response, data: any){
    res
    // .sendStatus(HTTPStatus.OK)
    .json({payload: data});
}
