import {Request, Response} from 'express';
import UserController from './UserController'
let userCtrl

class UserRouter{
    

    constructor(){
        userCtrl = new UserController()
    }
    
    getAll(req: Request, res: Response){
        return userCtrl.getAll(req, res);
    }

    findOne(req: Request, res: Response){
        return userCtrl.getById(req, res);
    }

    create(req: Request, res: Response){
        return userCtrl.create(req, res);
    }

    update(req: Request, res: Response){
        return userCtrl.update(req, res);
    }

    delete(req: Request, res: Response){
        return userCtrl.delete(req, res);
    }
}
export default UserRouter