import { Sequelize, DataTypes} from 'sequelize'
import * as bcrypt from 'bcrypt';

export default (sequelize: Sequelize, DataTypes: DataTypes) => {
    
    const User = sequelize.define('User', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        }

    })

    User.beforeCreate(user =>{
        return hashPassword(user);
    });

    User.beforeUpdate(user => hashPassword(user));

    function hashPassword(user){
        const salt = bcrypt.genSaltSync(10);
        user.set('password', bcrypt.hashSync(user.password, salt));
    }

    return User;
}