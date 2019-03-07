import { Request, Response} from 'express';
import * as _ from 'lodash';
import UserService from '../user/UserService';
import authSuccess from '../../responses/authSuccess';
import authFail from '../../responses/authFail';

const userService = new UserService();

class TokenRoutes{

    auth(req: Request, res: Response){

        const credentials = {
            email: req.body.email,
            password: req.body.password
        };

        if(credentials.hasOwnProperty('email') && credentials.hasOwnProperty('password')){
            userService
                .getByEmail(credentials.email)
                .then(_.partial(authSuccess, res, credentials))
                .catch(_.partial(authFail, req, res));
        }
    }
}

export default TokenRoutes;