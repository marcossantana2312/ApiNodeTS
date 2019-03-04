import{ app, request, expect } from './config/helpers';

describe('Testes de Integração', ()=>{

    describe('GET /', ()=>{
        it('Deve retornar a mensagem Hello World', done =>{
            request(app)
            .get('/')
            .end((error, res: Response)=>{
                expect(res.status).to.equal(200);
                expect(res.text).to.be.eql('Hello World');
                done(error);
            });
        });
    });

    describe('GET /ola/:nome', ()=>{
        const nome = 'Marquito passado';
        it(`Deve retornar a mensagem Hello, ${nome}`, done =>{
            request(app)
                .get(`/ola/${nome}`)
                .end((error, res: Response)=>{
                    expect(res.status).to.equal(200);
                    expect(res.text).to.be.equal(`Hello, ${nome}`);
                    done(error);
                })
        })
    })

    describe('GET api/users/all', ()=>{
        it('Deve retornar um Json com todos os usuários', done=> {
            request(app)
                .get('/api/users/all')
                .end((error: Error, res: Response) =>{
                    expect(res.status).to.equal(200);
                })
        });
    });

    describe('GET api/users/:id', ()=>{
        it('Deve retornar um Json com apenas um usuário', done=> {
            request(app)
                .get(`/api/users/${1}`)
                .end((error: Error, res: Response) =>{
                    expect(res.status).to.equal(200);
                })
        });
    });

    describe('POST api/users/new', ()=>{
        it('Deve criar um novo usuário', done=> {
            
            const user = {
                nome: 'Teste'
            }

            request(app)
              .post('/api/users/new')
              .send(user)
              .end((error: Error, res: Response) =>{
                expect(res.status).to.equal(200);
              })
        });
    });

    describe('PUT api/users/:id/update', ()=>{
        it('Deve atualizar um usuário', done=> {
            const user = {
                nome : 'TesteUpdate'
            }
            request(app)
            .put(`/api/users/${1}/edit`)
            .send(user)
            .end((error: Error, res: Response) =>{
                expect(res.status).to.equal(200);
            })
        });
    });

    describe('DELETE api/users/:id/delete', ()=>{
        it('Deve deletar um usuário', done=> {
            request(app)
            .DELETE(`/api/users/delete/${1}`)
            .end((error: Error, res: Response) =>{
                expect(res.status).to.equal(200);
            })
        });
    });
})