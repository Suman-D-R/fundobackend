import { expect } from 'chai';
import request from 'supertest';
import mongoose from 'mongoose';

import app from '../../src/index';

describe('User APIs Test', () => {

  let token;
  let id;
  before((done) => {
    const clearCollections = () => {
      for (const collection in mongoose.connection.collections) {
        mongoose.connection.collections[collection].deleteOne(() => {});
      }
    };

    const mongooseConnect = async () => {
      await mongoose.connect(process.env.DATABASE_TEST);
      clearCollections();
    };

    if (mongoose.connection.readyState === 0) {
      mongooseConnect();
    } else {
      clearCollections();
    }

    done();
  });

  describe('POST /users', () => {
    it('should update a user', (done) => {
      const userDetails = {
        firstName: "suman",
        lastName: "dr",
        email: "shbdjah@gasn.com",
        password: "suman",
        confirmPassword: "suman"
      };
  
      console.log('Test started');
  
      request(app)
        .post('/api/v1/users')
        .send(userDetails)
        .end((err, res) => {
          console.log('Request completed');
          expect(res.statusCode).to.be.equal(201);
          done();
        });
    });
  });

  describe('POST /users', () => {
    it('should update a user', (done) => {
      const userDetails = {
        email: "shbdjah@gasn.com",
        password: "suman",
      };
  
      console.log('Test started');
  
      request(app)
        .post('/api/v1/users/login')
        .send(userDetails)
        .end((err, res) => {
          token=res.body.data;
          console.log('Request completed ------->',res.body.data);
          expect(res.statusCode).to.be.equal(200);
          done();
        });
    });
  });

  describe('POST /notes', () => {
    it('should create note', (done) => {
      const userDetails = {
        title:"hello",
        decription:"hello"
      };
  
      console.log('Test started');
  
      request(app)
        .post('/api/v1/notes')
        .set('Authorization', `Bearer ${token}`)
        .send(userDetails)
        .end((err, res) => {
          id = res.body.data._id;
          console.log('Request completed');
          expect(res.statusCode).to.be.equal(200);
          done();
        });
    });
  });

  describe('GET /notes', () => {
    it('should getall note', (done) => {
  
      console.log('Test started');
  
      request(app)
        .get('/api/v1/notes')
        .set('Authorization', `Bearer ${token}`)
        .end((err, res) => {
          console.log('Request completed');
          expect(res.statusCode).to.be.equal(200);
          done();
        });
    });
  });

  
  describe('GET /notes', () => {
    it('should get note', (done) => {
  
      console.log('Test started');
  
      request(app)
        .get(`/api/v1/notes/${id}`)
        .set('Authorization', `Bearer ${token}`)
        .end((err, res) => {
          console.log('Request completed');
          expect(res.statusCode).to.be.equal(200);
          done();
        });
    });
  });

  describe('PUT /notes', () => {
    it('should update note', (done) => {
      const updateUserDetails = {
        title:"hello",
        decription:"hello"
      };
      console.log('Test started');
  
      request(app)
        .put(`/api/v1/notes/${id}`)
        .set('Authorization', `Bearer ${token}`)
        .send(updateUserDetails)
        .end((err, res) => {
          console.log('Request completed');
          expect(res.statusCode).to.be.equal(200);
          done();
        });
    });
  });

  describe('PUT /notes', () => {
    it('should delete note', (done) => {
      
      console.log('Test started');
  
      request(app)
        .put(`/api/v1/notes/${id}/deleteNote`)
        .set('Authorization', `Bearer ${token}`)
        .end((err, res) => {
          console.log('Request completed');
          expect(res.statusCode).to.be.equal(200);
          done();
        });
    });
  });

  describe('PUT /notes', () => {
    it('should achive note', (done) => {
      
      console.log('Test started');
  
      request(app)
        .put(`/api/v1/notes/${id}/achiveNote`)
        .set('Authorization', `Bearer ${token}`)
        .end((err, res) => {
          console.log('Request completed');
          expect(res.statusCode).to.be.equal(200);
          done();
        });
    });
  });

  describe('DELETE /notes', () => {
    it('should delete note', (done) => {
  
      console.log('Test started');
  
      request(app)
        .delete(`/api/v1/notes/${id}`)
        .set('Authorization', `Bearer ${token}`)
        .end((err, res) => {
          console.log('Request completed');
          expect(res.statusCode).to.be.equal(200);
          done();
        });
    });
  });

  after((done) => {
    mongoose.disconnect(done);
  });
  
});
