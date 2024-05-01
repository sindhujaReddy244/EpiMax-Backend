const request = require('supertest');
const app = require('../index');

describe('Authentication Endpoints', () => {
  let token; // Store JWT token for authenticated requests

  before(async () => {
    // Login user and get JWT token for authenticated requests
    const res = await request(app)
      .post('/api/login') // Updated login endpoint
      .send({ username: 'john.doe', password: 'strongpassword' }); // Updated test user credentials

    token = res.body.token;
  });

  it('should register a new user', async () => {
    const res = await request(app)
      .post('/api/register') // Updated registration endpoint
      .send({ username: 'newuser', password: 'newpassword', role: 'user' }); // Updated test user credentials

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('user');
    expect(res.body).toHaveProperty('token');
  });

  it('should login an existing user', async () => {
    const res = await request(app)
      .post('/api/login') // Updated login endpoint
      .send({ username: 'john.doe', password: 'strongpassword' }); // Updated test user credentials

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('user');
    expect(res.body).toHaveProperty('token');
  });

  it('should return unauthorized for protected routes without token', async () => {
    const res = await request(app)
      .get('/api/tasks') // Updated protected route endpoint
      .set('Authorization', '');

    expect(res.statusCode).toEqual(401);
  });

  it('should return authorized for protected routes with token', async () => {
    const res = await request(app)
      .get('/api/tasks') // Updated protected route endpoint
      .set('Authorization', `Bearer ${token}`); // Updated token handling

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('data');
  });
});
