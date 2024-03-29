import { useEffect, useState } from "react";
import { httpClient } from "../../../util/Api";
// import {useHistory} from "react-router-dom";
// import jwtDecode from "jwt-decode";
// import {
//   USER_LOADED,
//   AUTH_ERROR,
//   LOGIN_SUCCESS,
//   LOGIN_FAIL,
//   LOGOUT,
//   CLEAR_ERROR,
// } from "../../types";
// import ErrorPage from '../../../routes/NotFound';

export const useProvideAuth = () => {
  const [authUser, setAuthUser] = useState(null);
  const [error, setError] = useState("");
  const [isLoadingUser, setLoadingUser] = useState(true);
  const [isLoading, setLoading] = useState(false);
  // const [dataAuth, setDataAuth] = useState()
  // const nRef = useRef(dataAuth);
  // useEffect(() => {
  //   nRef.current = dataAuth
  // },
  //  [dataAuth]
  //  )

  const fetchStart = () => {
    setLoading(true);
    setError("");
  };

  const fetchSuccess = () => {
    setLoading(false);
    setError("");
  };

  const fetchError = (error) => {
    setLoading(false);
    setError(error);
  };

  const userLogin = (user, callbackFun) => {
    // setDataAuth(user)
    fetchStart();
    httpClient
      .get(
        "login?username=" + user.username + "&password=" + user.password,
        user
      )
      .then(({ data }) => {
        if (data) {
          fetchSuccess();
          httpClient.defaults.headers.common["Authorization"] =
            "Bearer " + data.access_token;
          localStorage.setItem("token", data.access_token);
          getAuthUser();
          if (callbackFun) callbackFun();
        } else {
          fetchError(data.error);
        }
      })
      .catch(function (error) {
        // fetchError(error.message);
        fetchError("Username / Password Salah");
      });
  };

  const userSignup = (user, callbackFun) => {
    fetchStart();
    httpClient
      .post("auth/register", user)
      .then(({ data }) => {
        if (data) {
          fetchSuccess();
          localStorage.setItem("token", data.access_token);
          httpClient.defaults.headers.common["Authorization"] =
            "Bearer " + data.access_token;
          getAuthUser();
          if (callbackFun) callbackFun();
        } else {
          fetchError(data.error);
        }
      })
      .catch(function (error) {
        fetchError(error.message);
      });
  };

  const sendPasswordResetEmail = (username, callbackFun) => {
    fetchStart();

    setTimeout(() => {
      fetchSuccess();
      if (callbackFun) callbackFun();
    }, 300);
  };

  const confirmPasswordReset = (code, password, callbackFun) => {
    fetchStart();

    setTimeout(() => {
      fetchSuccess();
      if (callbackFun) callbackFun();
    }, 300);
  };

  const renderSocialMediaLogin = () => null;

  const userSignOut = (callbackFun) => {
    // const decoded = jwtDecode(localStorage.token);
    // if (decoded.exp < Date.now() / 1000) {
    //   // return dispatch({ type: AUTH_ERROR });
    // }
    fetchStart();
    httpClient
      .get("/logout")
      .then(({ data }) => {
        if (data) {
          fetchSuccess();
          httpClient.defaults.headers.common["Authorization"] = "";
          localStorage.removeItem("token");
          setAuthUser(false);
          if (callbackFun) callbackFun();
        } else {
          fetchError(data.error);
        }
      })
      .catch(function (error) {
        fetchError(error.message);
      });
    // history.push('/signin')
  };

  const getAuthUser = () => {
    fetchStart();
    httpClient
      .get("/user")
      .then(({ data }) => {
        if (data) {
          fetchSuccess();
          setAuthUser(data);
        } else {
          fetchError(data.error);
        }
      })
      .catch(function (error) {
        httpClient.defaults.headers.common["Authorization"] = "";
        fetchError(error.message);
      });
  };

  // Subscribe to user on mount
  // Because this sets state in the callback it will cause any ...
  // ... component that utilizes this hook to re-render with the ...
  // ... latest auth object.

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      httpClient.defaults.headers.common["Authorization"] = "Bearer " + token;
      httpClient.get("/user").then(({ data }) => {
        if (data) {
          setAuthUser(data);
        }
        setLoadingUser(false);
      });
      // setAuthUser(data);
    } else if (token === null) {
      setLoadingUser(false);
      // localStorage.setItem('auth-token', '');
      // token = '';
      // setAuthUser(false);
      //
      //  return  <ErrorPage/>
    }
    // httpClient
    //   // .get('login?username=' + nRef.username + '&password=' + nRef.password, nRef)
    //   .get('/user')
    // .then(({ data }) => {
    //   if ( data) {
    //     setAuthUser(data);
    //   }
    //   setLoadingUser(false);

    //   })
    //   .catch(function () {
    //     localStorage.removeItem('token');
    //     httpClient.defaults.headers.common['Authorization'] = '';
    //     setLoadingUser(false);
    //   })
  }, []);

  // Return the user object and auth methods
  return {
    isLoadingUser,
    isLoading,
    authUser,
    error,
    setError,
    setAuthUser,
    getAuthUser,
    userLogin,
    userSignup,
    userSignOut,
    renderSocialMediaLogin,
    sendPasswordResetEmail,
    confirmPasswordReset,
  };
};
