import { useState, useEffect } from "react";
import axios from "axios";
import { getmeApi } from "../services/ApiService/user.apiService";

export default function useAuth() {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await getmeApi;

        setUser(res.data.user);
        setIsLoggedIn(true);

      } catch (err) {
        setUser(null);
        setIsLoggedIn(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  return { user, setUser, isLoggedIn, setIsLoggedIn, loading, setLoading };
}
