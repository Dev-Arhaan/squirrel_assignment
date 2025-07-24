import axios from 'axios';

// Create an Axios instance with a pre-configured base URL.
// This means you don't have to type the full URL for every request.
const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  }
});

/**
 * Makes a POST request to register a new doctor's clinic.
 * @param {object} clinicData - The clinic data to be submitted.
 * @param {string} clinicData.name - The doctor's name.
 * @param {string} clinicData.address - The clinic's address.
 * @param {number} clinicData.latitude - The clinic's latitude.
 * @param {number} clinicData.longitude - The clinic's longitude.
 * @returns {Promise<object>} The data returned from the API on success.
 * @throws {Error} Throws an error if the API request fails.
 */
export const registerDoctorClinic = async (clinicData) => {
  try {
    const response = await API.post('/doctors', clinicData);
    return response.data;
  } catch (error) {
    // Re-throw a more specific error to be caught by the component
    throw new Error(error.response?.data?.message || 'An unknown error occurred while registering.');
  }
};

/**
 * Searches for doctors within a given radius of a location.
 * @param {object} searchParams - The search parameters.
 * @param {number} searchParams.latitude - The latitude of the search center.
 * @param {number} searchParams.longitude - The longitude of the search center.
 * @param {number} searchParams.radiusKm - The search radius in kilometers.
 * @returns {Promise<Array>} A list of doctors found.
 * @throws {Error} Throws an error if the API request fails.
 */
export const searchDoctors = async (searchParams) => {
  try {
    // Axios will automatically append `params` as a query string
    // e.g., /doctors/search?latitude=28.4&longitude=77.3&radiusKm=10
    const response = await API.get('/doctors/search', { params: searchParams });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch doctors.');
  }
};