import chai from "chai"
import chaiHttp from "chai-http"

import {app} from "./index.mjs"
import {database} from "./configs/database.mjs";

chai.should();
chai.use(chaiHttp);

let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NzU0ODI2MTF9.kWAnW2Ii84P20l3zJdm5d7NWCUUV1dbhygnY7K3BCCA";
let url = 'http://localhost:3000';

describe("Teste base de API", () => {

    before(async () => await database.migrate.latest())
    after(async () => await database.destroy())

    it("Deveria estar em modo de teste", done => {
        if (!process.env.NODE_ENV) return done(new Error("NODE_ENV vazio"));
        process.env.NODE_ENV.should.be.eql("test");
        done();
    })

    it("Deveria retornar status 'online'", done => {
        chai
            .request(url)
            .get('/status')
            .end((err, res) => {
                if (err) return done(err);
                res.should.have.status(200);
                res.text.should.be.eql("online");
                done();
            });
    });

    it("Deveria retornar o token do login", done => {
        chai
            .request(url)
            .post('/login')
            .set({ Authorization: `Bearer ${token}` })
            .send({nome: "axtrin", senha: "teste"})
            .end((err, res) => {
                if (err) return done(err);
                res.should.have.status(200);
                res.body.should.be.an('Object');
                done();
            });
    });

    it("deveria listar perfis", done => {
        chai
            .request(url)
            .get('/perfis')
            .set({ Authorization: `Bearer ${token}` })
            .end((err, res) => {
                if (err) return done(err);
                res.should.have.status(200);
                res.body.should.be.an('Array');
                done();
            });
    });
    
    it("deveria listar pessoas", done => {
        chai
            .request(url)
            .get('/pessoas')
            .set({ Authorization: `Bearer ${token}` })
            .end((err, res) => {
                if (err) return done(err);
                res.should.have.status(200);
                res.body.should.be.an('Array');
                done();
            });
    });

    it("deveria recuperar uma pessoa", done => {
        chai
            .request(url)
            .get('/pessoas/1')
            .set({ Authorization: `Bearer ${token}` })
            .end((err, res) => {
                if (err) return done(err);
                res.should.have.status(200);
                res.body.should.be.an('Object');
                done();
            });
    });

    it("deveria inserir uma pessoa", done => {
        chai
            .request(url)
            .post('/pessoas')
            .set({ Authorization: `Bearer ${token}` })
            .send({nome: "Evangelista", senha: "", perfis_id: 2})
            .end((err, res) => {
                if (err) return done(err);
                res.should.have.status(200);
                res.body.should.be.an('Array');
                done();
            });
    });

    it("deveria atualizar uma pessoa", done => {
        chai
            .request(url)
            .put('/pessoas/1')
            .set({ Authorization: `Bearer ${token}` })
            .send({nome: "Judas", senha: "", perfis_id: 1})
            .end((err, res) => {
                if (err) return done(err);
                res.should.have.status(200);
                res.body.should.be.an('number');
                done();
            });
    });

    it("deveria excluir uma pessoa", done => {
        chai
            .request(url)
            .del('/pessoas/6')
            .set({ Authorization: `Bearer ${token}` })
            .end((err, res) => {
                if (err) return done(err);
                res.should.have.status(200);
                res.body.should.be.an('number');
                done();
            });
    });



    it("deveria listar setores", done => {
        chai
            .request(url)
            .get('/setores')
            .set({ Authorization: `Bearer ${token}` })
            .end((err, res) => {
                if (err) return done(err);
                res.should.have.status(200);
                res.body.should.be.an('Array');
                done();
            });
    });
    
    it("deveria recuperar um setor", done => {
        chai
            .request(url)
            .get('/setores/1')
            .set({ Authorization: `Bearer ${token}` })
            .end((err, res) => {
                if (err) return done(err);
                res.should.have.status(200);
                res.body.should.be.an('Object');
                done();
            });
    });
    
    it("deveria inserir um setor", done => {
        chai
            .request(url)
            .post('/setores')
            .set({ Authorization: `Bearer ${token}` })
            .send({nome: "Evangelista"})
            .end((err, res) => {
                if (err) return done(err);
                res.should.have.status(200);
                res.body.should.be.an('Array');
                done();
            });
    });
    
    it("deveria atualizar um setor", done => {
        chai
            .request(url)
            .put('/setores/1')
            .set({ Authorization: `Bearer ${token}` })
            .send({nome: "Judas"})
            .end((err, res) => {
                if (err) return done(err);
                res.should.have.status(200);
                res.body.should.be.an('number');
                done();
            });
    });
    
    it("deveria excluir um setor", done => {
        chai
            .request(url)
            .del('/setores/6')
            .set({ Authorization: `Bearer ${token}` })
            .end((err, res) => {
                if (err) return done(err);
                res.should.have.status(200);
                res.body.should.be.an('number');
                done();
            });
    });

    it("deveria listar gabinetes", done => {
        chai
            .request(url)
            .get('/gabinetes')
            .set({ Authorization: `Bearer ${token}` })
            .end((err, res) => {
                if (err) return done(err);
                res.should.have.status(200);
                res.body.should.be.an('Array');
                done();
            });
    });
    
    it("deveria recuperar um gabinete", done => {
        chai
            .request(url)
            .get('/gabinetes/1')
            .set({ Authorization: `Bearer ${token}` })
            .end((err, res) => {
                if (err) return done(err);
                res.should.have.status(200);
                res.body.should.be.an('Object');
                done();
            });
    });
    
    it("deveria inserir um gabinete", done => {
        chai
            .request(url)
            .post('/gabinetes')
            .set({ Authorization: `Bearer ${token}` })
            .send({nome: "Evangelista", varas_id: 1})
            .end((err, res) => {
                if (err) return done(err);
                res.should.have.status(200);
                res.body.should.be.an('Array');
                done();
            });
    });
    
    it("deveria atualizar um gabinete", done => {
        chai
            .request(url)
            .put('/gabinetes/1')
            .set({ Authorization: `Bearer ${token}` })
            .send({nome: "Judas", varas_id: 1})
            .end((err, res) => {
                if (err) return done(err);
                res.should.have.status(200);
                res.body.should.be.an('number');
                done();
            });
    });
    
    it("deveria excluir um gabinete", done => {
        chai
            .request(url)
            .del('/gabinetes/6')
            .set({ Authorization: `Bearer ${token}` })
            .end((err, res) => {
                if (err) return done(err);
                res.should.have.status(200);
                res.body.should.be.an('number');
                done();
            });
    });   


    it("deveria listar lotações", done => {
        chai
            .request(url)
            .get('/lotacoes')
            .set({ Authorization: `Bearer ${token}` })
            .end((err, res) => {
                if (err) return done(err);
                res.should.have.status(200);
                res.body.should.be.an('Array');
                done();
            });
    });

    it("deveria recuperar uma lotação", done => {
        chai
            .request(url)
            .get('/lotacoes/1')
            .set({ Authorization: `Bearer ${token}` })
            .end((err, res) => {
                if (err) return done(err);
                res.should.have.status(200);
                res.body.should.be.an('Object');
                done();
            });
    });

    it("deveria inserir uma lotação", done => {
        chai
            .request(url)
            .post('/lotacoes')
            .set({ Authorization: `Bearer ${token}` })
            .send({pessoas_id: 1, gabinetes_id: 1})
            .end((err, res) => {
                if (err) return done(err);
                res.should.have.status(200);
                res.body.should.be.an('Array');
                done();
            });
    });

    it("deveria atualizar uma lotação", done => {
        chai
            .request(url)
            .put('/lotacoes/1')
            .set({ Authorization: `Bearer ${token}` })
            .send({pessoas_id: 1, gabinetes_id: 1})
            .end((err, res) => {
                if (err) return done(err);
                res.should.have.status(200);
                res.body.should.be.an('number');
                done();
            });
    });

    it("deveria excluir uma lotação", done => {
        chai
            .request(url)
            .del('/lotacoes/6')
            .set({ Authorization: `Bearer ${token}` })
            .end((err, res) => {
                if (err) return done(err);
                res.should.have.status(200);
                res.body.should.be.an('number');
                done();
            });
    });

    
    it("deveria listar varas", done => {
        chai
            .request(url)
            .get('/varas')
            .set({ Authorization: `Bearer ${token}` })
            .end((err, res) => {
                if (err) return done(err);
                res.should.have.status(200);
                res.body.should.be.an('Array');
                done();
            });
    });

    it("deveria recuperar uma vara", done => {
        chai
            .request(url)
            .get('/varas/1')
            .set({ Authorization: `Bearer ${token}` })
            .end((err, res) => {
                if (err) return done(err);
                res.should.have.status(200);
                res.body.should.be.an('Object');
                done();
            });
    });

    it("deveria inserir uma vara", done => {
        chai
            .request(url)
            .post('/varas')
            .set({ Authorization: `Bearer ${token}` })
            .send({nome: "Evangelista", setores_id: 1})
            .end((err, res) => {
                if (err) return done(err);
                res.should.have.status(200);
                res.body.should.be.an('Array');
                done();
            });
    });

    it("deveria atualizar uma vara", done => {
        chai
            .request(url)
            .put('/varas/1')
            .set({ Authorization: `Bearer ${token}` })
            .send({nome: "Judas", setores_id: 1})
            .end((err, res) => {
                if (err) return done(err);
                res.should.have.status(200);
                res.body.should.be.an('number');
                done();
            });
    });

    it("deveria excluir uma vara", done => {
        chai
            .request(url)
            .del('/varas/6')
            .set({ Authorization: `Bearer ${token}` })
            .end((err, res) => {
                if (err) return done(err);
                res.should.have.status(200);
                res.body.should.be.an('number');
                done();
            });
    });
})