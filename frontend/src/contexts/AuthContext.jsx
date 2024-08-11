import axios from "axios";

import React, { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext({});

const client = axios.create({
  baseURL: "http://localhost:8000/api/v1/users",
});

// Manually defining HttpStatusCode if not available in axios
const HttpStatusCode = {
  OK: 200,
  CREATED: 201,
};

export const AuthProvider = ({ children }) => {
  const authContext = useContext(AuthContext);
  const [userData, setUserData] = useState(authContext);

  const handleRegister = async (name, username, password) => {
    try {
      let response = await client.post("/register", {
        name: name,
        username: username,
        password: password,
      });

      if (response.status === HttpStatusCode.CREATED) {
        return response.data.message;
      }
    } catch (err) {
      throw new Error(err.response?.data?.message || "Registration failed");
    }
  };

  const handleLogin = async (username, password) => {
    try {
      let response = await client.post("/login", {
        username: username,
        password: password,
      });

      if (response.status === HttpStatusCode.OK) {
        localStorage.setItem("token", response.data.token);
        setUserData(response.data.user); // Update userData with user info
        router("/home");
        return response.data;
      }
    } catch (err) {
      throw new Error(err.response?.data?.message || "Login failed");
    }
  };

  const getHistoryOfUser = async () => {
    try {
      let response = await client.get("/get_all_activity", {
        params: {
          token: localStorage.getItem("token"),
        },
      });
      return response.data;
    } catch (err) {
      throw new Error(
        err.response?.data?.message || "Failed to fetch user history"
      );
    }
  };

  const addToUserHistory = async (meetingCode) => {
    try {
      let response = await client.post("/add_to_activity", {
        token: localStorage.getItem("token"),
        meeting_code: meetingCode,
      });
      return response.data;
    } catch (err) {
      throw new Error(
        err.response?.data?.message || "Failed to add to user history"
      );
    }
  };

  const router = useNavigate();

  const data = {
    userData,
    setUserData,
    addToUserHistory,
    getHistoryOfUser,
    handleRegister,
    handleLogin,
  };

  return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
};
