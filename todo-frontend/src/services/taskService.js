/**
 * Task Service - handles all API calls to the backend
 * Base URL for the Spring Boot backend API
 */
const API_BASE_URL = 'http://localhost:8080/api/tasks';

/**
 * Helper function to handle API responses
 */
const handleResponse = async (response) => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(errorData?.message || `HTTP error! status: ${response.status}`);
  }
  
  // Handle 204 No Content responses
  if (response.status === 204) {
    return null;
  }
  
  return response.json();
};

/**
 * Helper function to make API requests
 */
const apiRequest = async (url, options = {}) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, config);
    return await handleResponse(response);
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
};

/**
 * Task Service object containing all task-related API methods
 */
export const taskService = {
  /**
   * Get all tasks
   */
  getAllTasks: async () => {
    return apiRequest(API_BASE_URL);
  },

  /**
   * Get a single task by ID
   */
  getTaskById: async (id) => {
    return apiRequest(`${API_BASE_URL}/${id}`);
  },

  /**
   * Create a new task
   */
  createTask: async (taskData) => {
    return apiRequest(API_BASE_URL, {
      method: 'POST',
      body: JSON.stringify(taskData),
    });
  },

  /**
   * Update an existing task
   */
  updateTask: async (id, taskData) => {
    return apiRequest(`${API_BASE_URL}/${id}`, {
      method: 'PUT',
      body: JSON.stringify(taskData),
    });
  },

  /**
   * Toggle task completion status
   */
  toggleTaskCompletion: async (id) => {
    return apiRequest(`${API_BASE_URL}/${id}/toggle`, {
      method: 'PATCH',
    });
  },

  /**
   * Delete a task
   */
  deleteTask: async (id) => {
    return apiRequest(`${API_BASE_URL}/${id}`, {
      method: 'DELETE',
    });
  },

  /**
   * Get completed tasks
   */
  getCompletedTasks: async () => {
    return apiRequest(`${API_BASE_URL}/completed`);
  },

  /**
   * Get pending tasks
   */
  getPendingTasks: async () => {
    return apiRequest(`${API_BASE_URL}/pending`);
  },

  /**
   * Get overdue tasks
   */
  getOverdueTasks: async () => {
    return apiRequest(`${API_BASE_URL}/overdue`);
  },

  /**
   * Get task statistics
   */
  getTaskStats: async () => {
    return apiRequest(`${API_BASE_URL}/stats`);
  },
};

export default taskService;
