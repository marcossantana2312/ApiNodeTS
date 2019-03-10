import{ app, request, expect } from './config/helpers';
import * as HTTPStatus from 'http-status'
import * as jwt from 'jwt-simple'
import { log } from 'util';

describe('Testes de Integração', ()=>{
    'use strict'
    const config = require('../../server/config/env/config')();
    const models = require('../../server/models');
    let id;
    let token;

    const userTest = {
        id:100,
        name: 'Usuario teste',
        email: 'test@test.com',
        password: 'teste'
    }
    const userDefault = {
        id:1,
        name: 'Marcos',
        email: 'marcos@email.com',
        password: '1234'
    }
    
    beforeEach((done)=>{
        models.User.destroy({
            where: {}
        }).then(()=>{
            return models.User.create(userDefault);
        }).then(()=>{
            models.User.create(userTest)
                .then(()=>{
                    token = jwt.encode({id: userDefault.id}, config.secret)
                    done();
                })
        })
    });
    console.log('token aqui:'+token);
     
    describe('Post /token', ()=>{
        it('Deve receber um JWT', done =>{
            const credentials = {
                email: userDefault.email,
                password: userDefault.password
            }
            request(app)
                .post('/token')
                .send(credentials)
                .end((error, res) =>{                    
                    expect(res.status).to.equal(HTTPStatus.OK);
                    expect(res.body.token).to.equal(`${token}`);
                    done(error);
                })
        })

        it('Não deve gerar token', done =>{
           const credentials = {
                email: 'email@email.com',
                password: 'blabla'
            }
            request(app)
                .post('/token')
                .send(credentials)
                .end((error, res)=>{             
                    expect(res.status).to.equal(HTTPStatus.UNAUTHORIZED);
                    expect(res.body).to.empty;
                    done(error);
                })
        })
    })

    describe('GET api/users/all', ()=>{
        it('Deve retornar um Json com todos os usuários', done=> {
            request(app)
                .get('/api/users/all')
                .set('Content-type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .end((error: Error, res) =>{
                    console.log(token);
                    
                    expect(res.status).to.equal(HTTPStatus.OK);
                    expect(res.body.payload).to.be.an('array');
                    expect(res.body.payload[0].name).to.be.equal(userDefault.name);
                    expect(res.body.payload[0].email).to.be.equal(userDefault.email);
                    done(error);
                })
        });
    });
    describe('GET api/users/:id', ()=>{
        it('Deve retornar um Json com apenas um usuário', done=> {

            request(app)
                .get(`/api/users/${userDefault.id}`)
                .set('Content-type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .end((error: Error, res) =>{
                    expect(res.status).to.equal(HTTPStatus.OK);
                    expect(res.body.payload.id).to.be.equal(userDefault.id);
                    expect(res.body.payload).to.have.all.keys([
                        'id', 'name', 'email', 'password'
                    ]);
                    id = res.body.payload.id;
                    done(error);
                })
        });
    });

    describe('POST api/users/new', ()=>{
        it('Deve criar um novo usuário', done=> {
            
            const user = {
                id: 2,
                name: 'Usuário teste post',
                email: 'usuario@teste.com',
                password: 'novousuario'
            }

            request(app)
              .post('/api/users/new')
              .set('Content-type', 'application/json')
              .set('Authorization', `Bearer ${token}`)
              .send(user)
              .end((error: Error, res) =>{
                expect(res.status).to.equal(HTTPStatus.OK);
                expect(res.body.payload.id).to.be.equal(user.id);
                expect(res.body.payload.name).to.be.equal(user.name);
                expect(res.body.payload.email).to.be.equal(user.email);
                done(error);
              })
        });
    });

    describe('PUT api/users/:id/update', ()=>{
        it('Deve atualizar um usuário', done=> {
            const user = {
                id: id,
                name : 'TesteUpdate',
                email: 'test@email.com',
                password: 'teste'
            }
            request(app)
            .put(`/api/users/${id}/update`)
            .set('Content-type', 'application/json')
            .set('Authorization', `Bearer ${token}`)
            .send(user)
            .end((error: Error, res) =>{     
                expect(res.status).to.equal(HTTPStatus.OK);
                expect(res.body.payload[0]).to.be.equal(1);
                done(error);
            })
        });
    });

    describe('DELETE api/users/:id/delete', ()=>{
        it('Deve deletar um usuário', done=> {
            request(app)
            .delete(`/api/users/${userDefault.id}/delete`)
            .set('Content-type', 'application/json')
            .set('Authorization', `Bearer ${token}`)
            .end((error: Error, res) =>{
                expect(res.status).to.equal(HTTPStatus.OK);
                expect(res.body.payload).to.be.equal(1);
                done(error);
            })
        });
    });
})