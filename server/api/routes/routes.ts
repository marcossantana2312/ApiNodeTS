import {Application, Request, Response} from "express";
import UserRouter from '../../modules/user/UserRouter'
import TokenRoutes from '../../modules/auth/auth'
import {Auth} from '../../auth';
class Routes{
;
    private userRouter: UserRouter
    private tokenRoute;

    constructor(){
        this.userRouter = new UserRouter();
        this.tokenRoute = new TokenRoutes();
    }

    initRoutes(app: Application, auth: Auth): void{
        app.route('/api/users/all').all(auth.config().authenticate).get(this.userRouter.getAll);
        app.route('/api/users/:id').all(auth.config().authenticate()).get(this.userRouter.findOne);
        app.route('/api/users/new').all(auth.config().authenticate()).post(this.userRouter.create);
        app.route('/api/users/:id/update').all(auth.config().authenticate()).put(this.userRouter.update);
        app.route('/api/users/:id/delete').all(auth.config().authenticate()).delete(this.userRouter.delete);
        app.post('/token', this.tokenRoute.auth)
    }
}

export default new Routes();