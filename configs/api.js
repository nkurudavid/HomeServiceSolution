import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000"; // Replace with your Django backend URL

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 5000, // Adjust the timeout as needed
});

// Define your API endpoints here
const endpoints = {
  // Authentication endpoints
  login: "/api/users/login/",
  signup: "/api/users/signup/",
  // User endpoints
  getUser: "/api/users/",
  updateUser: "/api/users/update_profile/",
  deleteUser: "/api/users/delete_account/",
  // Booking endpoints
  getBookings: "/api/bookings/",
  createBooking: "/api/bookings/",
  getBookingById: (id) => `/api/bookings/${id}/`,
  updateBooking: (id) => `/api/bookings/${id}/`,
  deleteBooking: (id) => `/api/bookings/${id}/`,
  getBookingTeam: (id) => `/api/bookings/${id}/team/`,
  getUserBookings: "/api/bookings/user_bookings/",
  // Service category endpoints
  getServiceCategories: "/api/service-categories/",
  getServiceCategoryById: (id) => `/api/service-categories/${id}/`,
  // Service endpoints
  getServices: "/api/services/",
  getServiceById: (id) => `/api/services/${id}/`,
  getServicesByCategory: (id) => `/api/services/${id}/by_category/`,
  // Team endpoints
  getTeams: "/api/teams/",
  getTeamById: (id) => `/api/teams/${id}/`,
  getTeamMembers: (id) => `/api/teams/${id}/members/`,
};

// Function to make a GET request
export const get = async (endpoint) => {
  try {
    const response = await api.get(endpoint);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Function to make a POST request
export const post = async (endpoint, data) => {
  try {
    const response = await api.post(endpoint, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Function to make a PUT request
export const put = async (endpoint, data) => {
  try {
    const response = await api.put(endpoint, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Function to make a PATCH request
export const patch = async (endpoint, data) => {
  try {
    const response = await api.patch(endpoint, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Function to make a DELETE request
export const remove = async (endpoint) => {
  try {
    const response = await api.delete(endpoint);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default endpoints;
