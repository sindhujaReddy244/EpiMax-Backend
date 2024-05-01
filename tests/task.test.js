
const request = require('supertest');
const app = require('../index');

let token; // Store JWT token for authenticated requests
let taskId; // Store task ID for testing CRUD operations

describe('Tasks API', () => {
  beforeAll(async () => {
    // Login user and get JWT token for authenticated requests
    const res = await request(app)
      .post('/auth/login')
      .send({ username: 'testuser', password: 'password123' });

    token = res.body.token;
  });

  it('should create a new task', async () => {
    const res = await request(app)
      .post('/tasks')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Test Task',
        description: 'This is a test task',
        status: 'pending',
      });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('id');
    taskId = res.body.id; // Save the task ID for other test cases
  });

  it('should retrieve all tasks', async () => {
    const res = await request(app)
      .get('/tasks')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBeTruthy();
  });

  it('should retrieve a specific task by ID', async () => {
    const res = await request(app)
      .get(`/tasks/${taskId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('id', taskId);
  });

  it('should update a task by ID', async () => {
    const res = await request(app)
      .put(`/tasks/${taskId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Updated Test Task',
        description: 'This is an updated test task',
        status: 'completed',
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('id', taskId);
    expect(res.body).toHaveProperty('title', 'Updated Test Task');
  });

  it('should delete a task by ID', async () => {
    const res = await request(app)
      .delete(`/tasks/${taskId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('id', taskId);
  });

  
});
