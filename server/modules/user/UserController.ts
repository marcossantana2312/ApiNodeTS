import {Request, Response} from 'express'
import * as HTTPStatus from 'http-status'
import * as _ from 'lodash';
import { onError } from '../../responses/errorHandler'
import { onSuccess } from '../../responses/sucessHandler'
import { dbErrorHandler } from '../../config/dbErrorHandler'
import UserService from './UserService';

class UserController{

    private userService: UserService;

    constructor(){
        this.userService = new UserService();
    }

    getAll(req: Request, res: Response){
        this.userService.getAll()
            .then(_.partial(onSuccess, res))
            .catch(_.partial(onError, res, 'Erro ao buscar todos os usuários'));
    }

    getById(req: Request, res: Response){
        const userId = parseInt(req.params.id)
        this.userService.getById(userId)
            .then(_.partial(onSuccess, res))
            .catch(_.partial(dbErrorHandler, res))
            .catch(_.partial(onError, res, 'Erro ao buscar usuário por id'))
    }

    create(req: Request, res: Response){
        this.userService.create(req.body)
            .then(_.partial(onSuccess, res))
            .catch(_.partial(dbErrorHandler, res))
            .catch(_.partial(onError, res, 'Erro ao inserir novo usuário'))
    }

    update(req: Request, res: Response){
        const userId = parseInt(req.params.id);
        const props = req.body;
        console.log(props);
        
        this.userService.update(userId, props)
            .then(_.partial(onSuccess, res))
            .catch(_.partial(onError, res, 'Erro ao atualizar usuário'))
    }

    delete(req: Request, res: Response){
        const userId = req.params.id
        this.userService.delete(userId)
            .then(_.partial(onSuccess, res))
            .catch(_.partial(onError, res, 'Erro ao deletar usuário'));
    }
}
export default UserController