import {Request, Response} from 'express';
import UserController from './UserController'

class UserRouter{
    
    userCtrl: UserController

    constructor(){
        this.userCtrl = new UserController()
    }
    
    getAll(req: Request, res: Response){
        return this.userCtrl.getAll(req, res);
    }

    findOne(req: Request, res: Response){
        return this.userCtrl.getById(req, res);
    }

    create(req: Request, res: Response){
        return this.userCtrl.create(req, res);
    }

    update(req: Request, res: Response){
        return this.userCtrl.update(req, res);
    }

    delete(req: Request, res: Response){
        return this.userCtrl.delete(req, res);
    }
}
export default UserRouter