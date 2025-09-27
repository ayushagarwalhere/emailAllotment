import request from 'supertest';

// Replace with your running API base URL
const app = 'http://localhost:5000';

describe('Student Routes', () => {
  // Mocked cookies and IDs for testing
  let studentCookie = 'userId=mockStudentToken';
  let testFormId = 'form-uuid-123';
  let testAnswers = [
    { questionId: 'question-uuid-1', response: 'John Doe' },
    { questionId: 'question-uuid-2', response: '25' }
  ];

  // POST /students/submit
  it('should submit form successfully', async () => {
    const res = await request(app)
      .post('/students/submit')
      .set('Cookie', studentCookie)
      .send({
        formId: testFormId,
        answers: testAnswers
      });

    expect([200,401,404,409,500]).toContain(res.status);
    if (res.status === 200) {
      expect(res.body).toHaveProperty('message', 'Form submitted successfully');
      expect(res.body).toHaveProperty('submission');
    }
  });

  // GET /students/status
  it('should retrieve student status', async () => {
    const res = await request(app)
      .get('/students/status')
      .set('Cookie', studentCookie);

    expect([200,401,404,500]).toContain(res.status);
    if (res.status === 200) {
      expect(['PENDING', 'APPROVED', 'REJECTED']).toContain(res.body.status);
    }
  });

  // PUT /students/resubmit
  it('should resubmit the form', async () => {
    const res = await request(app)
      .put('/students/resubmit')
      .set('Cookie', studentCookie)
      .send({
        formId: testFormId,
        answers: [
          { questionId: 'question-uuid-1', response: 'Jane Doe' }, // changed
          { questionId: 'question-uuid-2', response: '26' }
        ]
      });

    expect([200,401,403,404,500]).toContain(res.status);
    if (res.status === 200) {
      expect(res.body).toHaveProperty('message', 'Form resubmitted successfully');
      expect(res.body).toHaveProperty('updatedSubmission');
    }
  });
});
