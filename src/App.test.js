import { addEvento, verifyUser, getAllEvents, deleteEvento } from "./api/api";

describe('Integration Tests', () => {
  const NonExistentcreator = 'NonExistentUser';
  const NonExistentpassword = 'NonExistentPassword';
  const existentCreator = 'harlen';
  const existentPassword = 'cabeza';
  const eventName = 'Seminario';

  it('should get that the user exists', async () => {
    const response = await verifyUser(existentCreator, existentPassword);
    expect(response.existe).toBe(1);
  });

  it('should create an event', async () => {
    const response = await addEvento(eventName
                                    , 'Virtual'
                                    , '2025-2-10'
                                    , 'https://st2.depositphotos.com/1768926/10934/v/450/depositphotos_109347560-stock-illustration-water-wave-logo-template.jpg'
                                    , 'https://normas-apa.org/wp-content/uploads/Guia-Normas-APA-7ma-edicion.pdf'
                                    , existentCreator);
    expect(response.message).toBe('Evento creado exitosamente');
  });
 
  it('should get all the events to confirm to the user that the event was created', async () => {
    const response = await getAllEvents();
    // Actualmente hay 3 eventos en la base de datos por lo tanto se espera que la respuesta sea mayor a 3
    expect(response.length).toBeGreaterThan(3);
  });

  it('should get that the user doesnt exists', async () => {
    const response = await verifyUser(NonExistentcreator, NonExistentpassword);
    expect(response.existe).toBe(0);
  });
  
  it('should not create an event without an existing user', async () => {
    const response = await addEvento(eventName, 'Online', '2025-2-10', 'logo.png', 'material.pdf', creator);
    expect(response.message).toBe('Evento no creado');
  });


  /*
  Se reconoce la necesidad de un test para la función deleteEvento, 
  pero no existe tal funcion en ningun lado del codigo fuente.
  Debido a la falta de esta ultima parte despues de cada test se debe
  eliminar manualmente el evento creado en la base de datos para evitar
  problemas con los test futuros. Esto se puede hacer ejecutando el archivo
  deleteEvento.js en la carpeta src.
  .
  */
  it('should delete a resource', async () => {
      const response = await deleteEvento(eventName);
      expect(response).toBe("Successfully deleted the documents.");
  });
  
});
