process.env.NODE_ENV = 'test';
const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const User = require('../models/User');

const auth = {};
const request = supertest(app);

beforeAll(async () => {
  await User.deleteMany({});
});

afterAll(async () => {
  await User.deleteMany({});
});

it('The root path should have a message property', async (done) => {
  const res = await request.get('/');
  expect(res.status).toBe(200);
  expect(res.body.status).toBe(true);
  expect(res.body).toHaveProperty('message');
  done();
});

it('Signup new user', async (done) => {
  const res = await request.post('/api/auth/signup').send({
    name: 'Samuel',
    email: 'test@test.com',
    password: '123456'
  });

  expect(res.status).toBe(201);
  expect(res.body).toHaveProperty('message');
  expect(res.body).toHaveProperty('token');
  done();
});

it('Login a registered user', async (done) => {
  const res = await request.post('/api/auth/login').send({
    email: 'test@test.com',
    password: '123456'
  });

  expect(res.status).toBe(200);
  expect(res.body).toHaveProperty('message');
  expect(res.body).toHaveProperty('token');
  auth.token = res.body.token;
  done();
});

it('Should not Login a user without email', async (done) => {
  const res = await request.post('/api/auth/login').send({
    password: '123456'
  });

  expect(res.status).toBe(422);
  expect(res.body).toHaveProperty('errors');
  done();
});

it('Get auth user details', async (done) => {
  const res = await request.get('/api/auth').set('x-auth-token', auth.token);
  expect(res.status).toBe(200);
  expect(res.body.status).toBe(true);
  expect(res.body).toHaveProperty('message');
  expect(res.body).toHaveProperty('data');
  expect(res.body.data).toHaveProperty('id');
  expect(res.body.data).toHaveProperty('name');
  expect(res.body.data).toHaveProperty('email');
  expect(res.body.data).toHaveProperty('auth');
  done();
});

it('Only auth users are allowed', async (done) => {
  const res = await request.get('/api/auth');

  expect(res.status).toBe(401);
  expect(res.body.status).toBe(false);
  expect(res.body).toHaveProperty('error');
  done();
});

it('Should not login a user withou password', async (done) => {
  const res = await request.post('/api/auth/login').send({
    email: 'test@test.com'
  });

  expect(res.status).toBe(422);
  expect(res.body).toHaveProperty('errors');
  done();
});

it('Should not signup a user without name', async (done) => {
  const res = await request.post('/api/auth/signup').send({
    email: 'test@test.com',
    password: '123456'
  });
  expect(res.status).toBe(422);
  expect(res.body).toHaveProperty('errors');
  done();
});
