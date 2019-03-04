import {Request, Response, ErrorRequestHandler, NextFunction} from 'express';

export const errorHandlerApi = (err: ErrorRequestHandler, req: Request, res: Response, next: NextFunction)=>{
    console.error(`API error handler foi executada: ${err}`);
    res.status(500).json({
        errorCode: 'ERR-001',
        messager: 'Erro Interno do servidor'
    })

}