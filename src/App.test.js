import { addEvento } from "./api/api";


describe('Integration Tests', () => {
  it('should respond with status 201', async () => {
    const response = await addEvento('Test Event', 'Online', '2023-10-10', 'logo.png', 'material.pdf', 'creator123')
    expect(response.status).toBe(201);
  },50000);
});
