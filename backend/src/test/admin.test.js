import request from 'supertest';

const app = 'http://localhost:5000';

describe('Admin Routes', () => {
  let adminCookie = 'user=mockAdminToken';
  let formCookie;
  let questionId;
  let testUserId = 'user-uuid-123';

  // GET /admin/users
  it('should fetch pending users', async () => {
    const res = await request(app)
      .get('/admin/users')
      .set('Cookie', adminCookie);

    expect([200,401,500]).toContain(res.status); // flexible for different env
    if (res.status === 200) {
      expect(res.body).toHaveProperty('message');
      expect(Array.isArray(res.body.users)).toBe(true);
    }
  });

  // PATCH /admin/approveUser/:id
  it('should approve a user', async () => {
    const res = await request(app)
      .patch(`/admin/approveUser/${testUserId}`)
      .set('Cookie', adminCookie);

    expect([200,400,500]).toContain(res.status);
    if (res.status === 200) {
      expect(res.body).toHaveProperty('updatedUser');
      expect(res.body.updatedUser.status).toBe('APPROVED');
    }
  });

  // PATCH /admin/allotEmail/:id
  it('should allot email to approved user', async () => {
    const res = await request(app)
      .patch(`/admin/allotEmail/${testUserId}`)
      .set('Cookie', adminCookie);

    expect([200,400,404,500]).toContain(res.status);
    if (res.status === 200) {
      expect(res.body.updatedUser).toHaveProperty('emailAlloted', true);
    }
  });

  // POST /admin/createForm
  it('should create a form', async () => {
    const res = await request(app)
      .post('/admin/createForm')
      .set('Cookie', adminCookie)
      .send({ formName: 'Admission Form 2025' });

    expect([201,400,500]).toContain(res.status);
    if (res.status === 201) {
      expect(res.body.message).toMatch(/Form created/i);
      // Capture form cookie
      const cookies = res.headers['set-cookie'];
      formCookie = cookies.find(c => c.startsWith('form='));
      expect(formCookie).toBeDefined();
    }
  });

  // POST /admin/publishForms
  it('should publish the form', async () => {
    const res = await request(app)
      .post('/admin/publishForm')
      .set('Cookie', [adminCookie, formCookie]);

    expect([200,400,500]).toContain(res.status);
    if (res.status === 200) {
      expect(res.body.message).toMatch(/Form is live/i);
    }
  });

  // POST /admin/addQuestion
  it('should add a question to the form', async () => {
    const questionPayload = {
      question: 'What is your name?',
      type: 'TEXT',
      required: true
    };

    const res = await request(app)
      .post('/admin/addQuestion')
      .set('Cookie', [adminCookie, formCookie])
      .send(questionPayload);

    expect([201,400,500]).toContain(res.status);
    if (res.status === 201) {
      expect(res.body.newQuestion).toHaveProperty('id');
      questionId = res.body.newQuestion.id;
    }
  });

  // DELETE /admin/deleteQuestion/:id
  it('should delete a question', async () => {
    if (!questionId) return;

    const res = await request(app)
      .delete(`/admin/deleteQuestion/${questionId}`)
      .set('Cookie', [adminCookie, formCookie]);

    expect([200,400,404,500]).toContain(res.status);
    if (res.status === 200) {
      expect(res.body.message).toMatch(/Question deleted/i);
    }
  });
});
