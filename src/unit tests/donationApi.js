const fetch = require('node-fetch');  // Si estás usando 'node-fetch'

const addDonation = async (name, date, amount, projectName) => {
  try {
    const response = await fetch('https://civet-diverse-kid.ngrok-free.app/addDonacion', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, date, amount, projectName }),
    });

    const data = await response.json(); // Aquí se recibe directamente el objeto

    console.log('Respuesta recibida:', data);
    return data; // Retorna el objeto recibido directamente
  } catch (error) {
    console.error('Error al agregar la donación:', error);
  }
};

//addDonation('KendallRC2', '2025-01-21', 10, 'Caracol')
module.exports = { addDonation };
