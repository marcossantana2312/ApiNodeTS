export interface IUser{
    readonly id: number,
    name: string,
    email: string,
    password: string
}

export interface IUserDetail extends IUser{

}
export function createUser({id, name, email,password}):IUser{
    return{
        id, name, email, password
    }
}

export function createUsers(data: any[]):IUser[]{
    return data.map(createUser);
}

export function createById({id, name, email, password}):IUserDetail{
    return {
        id, name, email, password
    }
}

export function createByEmail({id, name,email, password}):IUserDetail{
    return {
        id, name, email, password
    }
}