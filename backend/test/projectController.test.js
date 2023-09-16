const request = require('supertest');
const app = require('../app');

describe('Project Endpoints', () => {
  it('should create a new project', async () => {
    const res = await request(app)
      .post('/create')
      .send({
        name: 'Test Project',
        description: 'Test Description',
        userId: 1
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('name');
  });
});