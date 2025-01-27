const { addDonation } = require('./prueba');

describe('Pruebas unitarias para realizar una donación', () => {

    it('Monto mayor a 0 y menor o igual a monto en cartera digital, debe ser aceptada', async () => {
        const response = await addDonation('KendallRC2', '2025-01-21', 2, 'Caracol');
        expect(response.donacion).toBe('exitosa');
      }, 20000); 

    it('Monto negativo, debe ser rechazada', async () => {
        const response = await addDonation('KendallRC2', '2025-01-21', -2, 'Caracol');
        expect(response.donacion).not.toBe('exitosa');
      }, 20000); 

    it('Monto igual a 0, debe ser rechazada', async () => {
        const response = await addDonation('KendallRC2', '2025-01-21', 0, 'Caracol');
        expect(response.donacion).not.toBe('exitosa');
      }, 20000); 

    it('Monto igual a "", debe ser rechazada', async () => {
        const response = await addDonation('KendallRC2', '2025-01-21', "", 'Caracol');
        expect(response.donacion).not.toBe('exitosa');
      }, 20000); 
    
    it('Monto igual a simbolo alfabetico, debe ser rechazada', async () => {
        const response = await addDonation('KendallRC2', '2025-01-21', "prueba", 'Caracol');
        expect(response.donacion).not.toBe('exitosa');
      }, 20000); 
    
    it('Monto mayor al monto en la cartera digital, debe ser rechazada', async () => {
        const response = await addDonation('KendallRC', '2025-01-21', 100, 'Caracol');
        expect(response.donacion).not.toBe('exitosa');
      }, 20000); 
      
});
