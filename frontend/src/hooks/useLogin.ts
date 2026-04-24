import { useState } from "react";
import { login } from "../api/user.api";

export const useLogin = () => {
  const [signIn, setSignIn] = useState<any>();
  const [loading, setLoading] = useState(true);


  const loginUser = async (form: any) => {
    try {
      const newLogin = await login(form);
      signIn && setSignIn((prev: any) => [...(prev as []), newLogin]);
    } catch (err) {
      console.error(err);
    } finally {
        setLoading(false)
    }
  };
  return { loginUser, loading };
};
