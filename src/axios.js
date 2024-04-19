import axios from 'axios';

let baseURL = "http://localhost:8000/api/"
const axiosInstance = axios.create({
	baseURL: baseURL,
	timeout: 500000,
	headers: {
		'Content-Type': 'application/json'
	}, 
});
axiosInstance.interceptors.request.use(function (config) {
    // const token = localStorage.getItem('token');
    let token = localStorage.getItem('access');
    config.headers.Authorization =  token ? 'JWT ' + token : '';
    return config;
  });


// Response interceptor to handle token expiration
axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;
  
      // If the error is due to an expired token and the request has not been retried
      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        const refresh= localStorage.getItem('refresh')

        if(!refresh) return Promise.reject(error);
        try {
          // Attempt to refresh the access token
          const refreshResponse = await axiosInstance.post('token/refresh/', {
            refresh: refresh,
          });
  
          // Update the stored tokens
          localStorage.setItem('access', refreshResponse.data.access);
          localStorage.setItem('refresh', refreshResponse.data.refresh);
          localStorage.setItem('isUserLoggedIn', true);
  
          // Retry the original request with the new access token
          return axiosInstance(originalRequest);
        } catch (refreshError) {
          // If refresh fails, log the user out or handle the situation accordingly
          console.error('Failed to refresh token:', refreshError);
          localStorage.removeItem('access');
          localStorage.removeItem('refresh');
          localStorage.removeItem('isUserLoggedIn');
          window.location.href = "/login";
          // You may want to redirect the user to the login page or show an error message
          // localStorage.removeItem('access');
          // localStorage.removeItem('refresh');
          // window.location.reload();
          return Promise.reject(refreshError);
        }
      }
  
      return Promise.reject(error);
    }
  );
  
export default axiosInstance;