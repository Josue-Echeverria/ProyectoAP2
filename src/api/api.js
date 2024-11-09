const API_BASE_URL = 'https://oyster-robust-ghost.ngrok-free.app';
// server.js

// const cors = require('cors');

export const verifyUser = async (username, password) => {
  try {
    const response = await fetch(`${API_BASE_URL}/verifyUser`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({username:username, password:password }),
    });
  
    if (!response.ok) {
    throw new Error('Network response was not ok');
    }
  
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error in verifyUser API call:', error);
    throw error; // Re-throw to handle it in the calling component
  }
};


// 1. Add User
export const addUser = async (name, email, password, phone, wallet) => {
  try {
  const response = await fetch(`${API_BASE_URL}/addUser`, {
    method: 'POST',
    headers: {
    'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, email, password, phone, wallet }),
  });

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  return await response.json();
  } catch (error) {
  console.error('Error in addUser API call:', error);
  throw error;
  }
};

// 2. Add Project
export const addProject = async (name, description, goal, endDate, creator, logo) => {
  try {
  const response = await fetch(`${API_BASE_URL}/addProyecto`, {
    method: 'POST',
    headers: {
    'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, description, goal, endDate, creator, logo }),
  });

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  return await response.json();
  } catch (error) {
  console.error('Error in addProject API call:', error);
  throw error;
  }
};

// 3. Add Donation
export const addDonation = async (name, date, amount, projectName) => {
  try {
  const response = await fetch(`${API_BASE_URL}/addDonacion`, {
    method: 'POST',
    headers: {
    'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, date, amount, projectName }),
  });

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  return await response.json();
  } catch (error) {
  console.error('Error in addDonation API call:', error);
  throw error;
  }
};

// 4. Update Password
export const updatePassword = async (username, password) => {
  try {
  const response = await fetch(`${API_BASE_URL}/update_password`, {
    method: 'POST',
    headers: {
    'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  return await response.json();
  } catch (error) {
  console.error('Error in updatePassword API call:', error);
  throw error;
  }
};

// 5. Update Project
export const updateProject = async (name, description, goal, endDate, logo) => {
  try {
  const response = await fetch(`${API_BASE_URL}/updateProject`, {
    method: 'POST',
    headers: {
    'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, description, goal, endDate, logo }),
  });

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  return await response.json();
  } catch (error) {
  console.error('Error in updateProject API call:', error);
  throw error;
  }
};

// 6. Get User
export const getUser = async (username) => {
  try {
  const response = await fetch(`${API_BASE_URL}/user/${username}`, {
    method: 'GET',
    headers: {
    'Content-Type': 'application/json',
    'ngrok-skip-browser-warning': 'any value', // Header to bypass the warning
    },
  });

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  return await response.json();
  } catch (error) {
  console.error('Error in getUser API call:', error);
  throw error;
  }
};

// 7. Get Donations by Donator Name
export const getDonations = async (donatorName) => {
  try {
  const response = await fetch(`${API_BASE_URL}/donation/${donatorName}`, {
    method: 'GET',
    headers: {
    'Content-Type': 'application/json',
    'ngrok-skip-browser-warning': 'any value', // Header to bypass the warning
    },
  });

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  return await response.json();
  } catch (error) {
  console.error('Error in getDonations API call:', error);
  throw error;
  }
};

// 8. Get All Projects
export const getAllProjects = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/projects`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'ngrok-skip-browser-warning': 'any value', // Header to bypass the warning
    },
    });
  
    if (!response.ok) {
    throw new Error('Network response was not ok');
    }
    const data = await response.json(); // Parse the JSON response
    return data; // Return the parsed data
  } catch (error) {
    console.error('Error in getAllProjects API call:', error);
    throw error; // Re-throw the error for further handling
  }
  };

// 9. Get All Users
export const getAllUsers = async () => {
  try {
  const response = await fetch(`${API_BASE_URL}/users`, {
    method: 'GET',
    headers: {
    'Content-Type': 'application/json',
    'ngrok-skip-browser-warning': 'any value', // Header to bypass the warning
    },
  });

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  return await response.json();
  } catch (error) {
  console.error('Error in getAllUsers API call:', error);
  throw error;
  }
};

// 10. Get All Donations
export const getAllDonations = async () => {
  try {
  const response = await fetch(`${API_BASE_URL}/donations`, {
    method: 'GET',
    headers: {
    'Content-Type': 'application/json',
    'ngrok-skip-browser-warning': 'any value', // Header to bypass the warning
    },
  });

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  return await response.json();
  } catch (error) {
  console.error('Error in getAllDonations API call:', error);
  throw error;
  }
};

// 11. Get Full Project by Name
export const getProjectFull = async (projectName) => {
  try {
  const response = await fetch(`${API_BASE_URL}/projectFull/${projectName}`, {
    method: 'GET',
    headers: {
    'Content-Type': 'application/json',
    'ngrok-skip-browser-warning': 'any value', // Header to bypass the warning
    },
  });

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  return await response.json();
  } catch (error) {
  console.error('Error in getProjectFull API call:', error);
  throw error;
  }
};

// 12. Get Projects by Creator Name
export const getProjectByName = async (creatorName) => {
  try {
  const response = await fetch(`${API_BASE_URL}/projectByName/${creatorName}`, {
    method: 'GET',
    headers: {
    'Content-Type': 'application/json',
    'ngrok-skip-browser-warning': 'any value', // Header to bypass the warning
    },
  });

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  return await response.json();
  } catch (error) {
  console.error('Error in getProjectByName API call:', error);
  throw error;
  }
};

export const deactivateUser = async (username) => {
  try {
    const response = await fetch(`${API_BASE_URL}/deactivateUser`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username }),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    return await response.json();
  } catch (error) {
    console.error('Error in deactivateUser API call:', error);
    throw error;
  }
}