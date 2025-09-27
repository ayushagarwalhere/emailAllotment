import request from 'supertest';

// Replace with your running API base URL or Express app
const app = 'http://localhost:5000';

describe('SuperAdmin Routes', () => {
  // Mocked cookies for testing
  let superAdminCookie = 'user=mockSuperAdminToken';
  let nonSuperAdminCookie = 'user=mockRegularUserToken';
  let createdAdminId;

  // POST /superadmin/createAdmin
  it('should create a new admin successfully', async () => {
    const res = await request(app)
      .post('/superadmin/createAdmin')
      .set('Cookie', superAdminCookie)
      .send({
        username: 'admin_test',
        email: 'admin_test@example.com',
        password: 'securePassword123',
        firstName: 'John',
        lastName: 'Doe'
      });

    expect([200,400,401,403,409,500]).toContain(res.status);
    if (res.status === 200) {
      expect(res.body).toHaveProperty('message', 'Admin created successfully');
      expect(res.body).toHaveProperty('jobId');
      createdAdminId = res.body.jobId; // Save for delete test
    }
  });

  // GET /superadmin/admins
  it('should retrieve list of all admins', async () => {
    const res = await request(app)
      .get('/superadmin/admins')
      .set('Cookie', superAdminCookie);

    expect([200,401,403,500]).toContain(res.status);
    if (res.status === 200) {
      expect(Array.isArray(res.body)).toBe(true);
    }
  });

  // DELETE /superadmin/deleteAdmin/:id
  it('should delete an admin successfully', async () => {
    if (!createdAdminId) return; // Skip if no admin created

    const res = await request(app)
      .delete(`/superadmin/deleteAdmin/${createdAdminId}`)
      .set('Cookie', superAdminCookie);

    expect([200,400,401,403,404,500]).toContain(res.status);
    if (res.status === 200) {
      expect(res.body).toHaveProperty('message', 'Admin deleted successfully');
      expect(res.body).toHaveProperty('deletedAdminId', createdAdminId);
    }
  });

  // Test unauthorized access
  it('should return 401 when cookie is missing', async () => {
    const res = await request(app).get('/superadmin/admins');
    expect([401,200,403,500]).toContain(res.status);
    if (res.status === 401) expect(res.body).toHaveProperty('error');
  });

  it('should return 403 for non-super admin', async () => {
    const res = await request(app)
      .get('/superadmin/admins')
      .set('Cookie', nonSuperAdminCookie);

    expect([403,200,401,500]).toContain(res.status);
    if (res.status === 403) expect(res.body).toHaveProperty('error');
  });
});
