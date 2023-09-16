const request = require('supertest');
const app = require('../app');

describe('Task Endpoints', () => {
  it('should create a new task', async () => {
    const res = await request(app)
      .post('/create')
      .send({
        name: 'Test Task',
        description: 'Test Description',
        projectId: 1
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('name');
  });

  it('should create a second task', async () => {
    const res = await request(app)
      .post('/create')
      .send({
        name: 'Test Task 2',
        description: 'Test Description 2',
        projectId: 1
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('name');
  });
});