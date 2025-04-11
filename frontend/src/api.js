// api.js

const BASE_URL = 'http://localhost:5001/api';  // Flask backend base path

export const fetchSimulationState = async () => {
  try {
    const response = await fetch(`${BASE_URL}/state`);
    if (!response.ok) {
      throw new Error('Failed to fetch simulation state');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching simulation state:', error);
    return { citizens: [], politicians: [], vote_counts: {} };
  }
};

export const fetchPosts = async () => {
  try {
    const response = await fetch(`${BASE_URL}/posts`);
    if (!response.ok) {
      throw new Error('Failed to fetch posts');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
};

export const runSimulationStep = async () => {
  try {
    const response = await fetch(`${BASE_URL}/simulate`, {
      method: 'POST',
    });
    if (!response.ok) {
      throw new Error('Failed to run simulation step');
    }
    return await response.json();
  } catch (error) {
    console.error('Error running simulation step:', error);
    return { success: false };
  }
};

export const addCitizen = async (citizenData) => {
  console.log("Adding citizen:", citizenData);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true, message: "Citizen added successfully" });
    }, 500);
  });
};

export const addPolitician = async (politicianData) => {
  console.log("Adding politician:", politicianData);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true, message: "Politician added successfully" });
    }, 500);
  });
};
