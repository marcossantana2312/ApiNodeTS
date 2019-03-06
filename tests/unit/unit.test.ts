import {testDouble, expect} from './config/helpers';
import UserService from '../../server/modules/user/UserService'

describe('Testes Unitários do Controller', ()=>{
  
    const userService = new UserService();
  
    // describe('Método Create', ()=>{
    //     it('Deve criar um novo usuário', ()=>{
    //         const newUser = {
    //             id: 1,
    //             name: 'Novo Usuário',
    //             email: 'novousuario@email.com',
    //             password: '1324'
    //         }
    //         userService.create(newUser)
    //             .then(data => {
    //                 expect(data.dataValues).to.have.all.keys(
    //                     ['email', 'id', 'name', 'password', 'updatedAt', 'createdAt']
    //                 )
    //             })
    //     });
    // });

    // describe('Método Update', ()=>{
    //     it('Deve atualizar um usuário', ()=>{
    //         const userUpdate = {
    //             name: 'nomeUpdate',
    //             email: 'atualizado@email'
    //         }
    //         userService.update(1, userUpdate)
    //             .then(data=>{
    //                 expect(data[0]).to.be.equal(1);
    //             })
    //     });
    // });
    
    // describe('Método Get Users', ()=>{
    //     it('Deve listar os usuários', ()=>{
    //         userService.getAll()
    //             .then(data => {
    //                 expect(data).to.be.an('array');
    //                 expect(data[0]).to.have.all.keys(
    //                     ['email', 'id', 'name', 'password']
    //                 )
    //             })
    //     });
    // });

    describe('Método GetById', ()=>{
        it('Deve retornar um usuário pelo id passado', ()=>{
            userService.getById(1)
                .then(data => {
                    expect(data.id).to.be.equal(1);
                    expect(data).to.have.all.keys(
                        'email', 'id', 'name', 'password'
                    );   
                })
        })
    })

    describe('Método GetByEmail', ()=>{
        it('Deve retornar um usuário pelo email passado', ()=>{
            const email = 'novousuario@email.com'
            userService.getByEmail(email)
                .then(data => {
                    expect(data.email).to.be.equal(email);
                    expect(data).to.have.all.keys(
                        'email', 'id', 'name', 'password'
                    )
                })
        })
    })


    // describe('Método Delete', ()=>{
    //     it('Deve excluir um usuário', ()=>{
    //         userService.delete(1)
    //         .then(data =>{
    //             expect(data).to.be.equal(1);
    //         })
    //     });
    // });

})