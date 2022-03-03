import jwtDecode from 'jwt-decode';
 
const isExpired = (token) => {
  const decoded = jwtDecode(token);
  if (Date.now() >= decoded.exp * 1000) {
    return true;
  }
  return false;
};
 
export default isExpired;