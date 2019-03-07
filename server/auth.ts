import * as passport from 'passport';
import { Strategy, ExtractJwt} from 'passport-jwt'
import UserService from './modules/user/UserService'
const config = require('./config/env/config');

export default function AuthConfig(){
    const userService = new UserService();
    let opts = {
        secretKey: config.secret,
        jwtFromRequest: ExtractJwt.fromAuthHeader()
    };

    passport.use(new Strategy(opts, (jwtPayload, done)=>{
        userService
            .getById(jwtPayload.id)
            .then(user => {
                if(user){
                    return done(null, {
                        id: user.id,
                        email: user.email
                    });
                }
                return done(null, false);
            })
            .catch(err=>{
                done(err, null);
            })
    }))

    return {
        initialize: ()=>{
            return passport.initialize()
        },
        authenticate: ()=>{
            return passport.authenticate('jwt', {session: false})
        }
    }
}