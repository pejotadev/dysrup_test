const request = require('supertest');
const app = require('../app');

describe('User Endpoints', () => {
  it('should create a new user', async () => {
    const res = await request(app)
      .post('/signup')
      .send({
        name: 'Test',
        email: 'test@test.com',
        password: 'password',
        level: '1'
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('name');
  });

  it('should authenticate a user', async () => {
    const res = await request(app)
      .post('/login')
      .send({
        email: 'test@test.com',
        password: 'password'
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('token');
  });
});