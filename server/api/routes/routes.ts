import {Application, Request, Response} from "express";
import UserRouter from '../../modules/user/UserRouter'
import TokenRoutes from '../../modules/auth/auth'

class Routes{
;
    private userRouter: UserRouter
    private tokenRoute;
    private auth;

    constructor(app: Application, auth: any){
        this.userRouter = new UserRouter();
        this.tokenRoute = new TokenRoutes();
        this.auth = auth;
        this.getRoutes(app);
    }

    getRoutes(app: Application): void{
        app.route('/api/users/all').all(this.auth.autenticate()).get(this.userRouter.getAll);
        app.route('/api/users/:id').all(this.auth.autenticate()).get(this.userRouter.findOne);
        app.route('/api/users/new').all(this.auth.autenticate()).post(this.userRouter.create);
        app.route('/api/users/:id/update').all(this.auth.autenticate()).put(this.userRouter.update);
        app.route('/api/users/:id/delete').all(this.auth.autenticate()).delete(this.userRouter.delete);
        app.post('/token', this.tokenRoute.auth)
    }
}

export default Routes;