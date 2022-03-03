import isExpired from './isExpired';
 
const reqOptions = (method, body, needToken = true) => {
  const headers = {};
  const options = {
    method,
    headers,
  };
  if (needToken) {
    const token = localStorage.getItem('token');
    headers.Authorization = token;
    if (isExpired(token) || !token) {
      localStorage.removeItem('token');
      window.location.replace('/login');
      return false;
    }
  }
  if (method !== 'GET') {
    headers['Content-Type'] = 'application/json';
    options.body = JSON.stringify(body);
  }
  return options;
};
 
export default reqOptions;
