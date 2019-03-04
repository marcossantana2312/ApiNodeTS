import {Application, Request, Response} from "express";
import UserRouter from '../../modules/user/UserRouter'

class Routes{

    userRouter: UserRouter
    constructor(app: Application){
        this.userRouter = new UserRouter();
        this.getRoutes(app);
    }

    getRoutes(app: Application): void{
        app.route('/api/users/all').get(this.userRouter.getAll);
        app.get('/api/users/:id', this.userRouter.findOne);
        app.post('/api/users/new', this.userRouter.create);
        app.put('/api/users/:id/update', this.userRouter.update);
        app.delete('api/user/:id/delete', this.userRouter.delete);
    }
}

export default Routes;