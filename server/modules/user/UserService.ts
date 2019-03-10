import {IUserDetail, IUser, createUser, createUsers, createById, createByEmail} from './UserInteface'
import * as Bluebird from 'bluebird';
const model = require('../../models/');
// import UserModel from '../../models/userModel'

class UserService{
    
    constructor(){}

    create(user: any){
        return model.User.create(user);
    }

    getAll():Bluebird<IUser[]>{
        return model.User.findAll({
            order: ['name']
        }).then(createUsers);
    }

    getById(id: number):Bluebird<IUserDetail>{
        return model.User.findOne({
            where:{
                id: id
            }
        }).then(createById)
    }

    getByEmail(email: string):Bluebird<IUserDetail>{
        return model.User.findOne({
            where: {
                email: email
            }
        }).then(createByEmail)
    }

    update(id:number, user: any){
       return model.User.update(
           user, {
                where: {id},
                fields: ['name', 'email', 'password'],
                hooks: true,
                individualHooks: true
            }
        );
    }

    delete(id:number){
        return model.User.destroy({
            where: {id}
        });
    }

}

export default UserService;