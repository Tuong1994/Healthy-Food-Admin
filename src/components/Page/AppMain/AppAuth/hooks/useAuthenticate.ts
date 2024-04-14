import { useEffect } from "react";
import { useNavigate } from "react-router";
import { authenticate } from "@/services/auth/api";
import { linkPaths } from "@/common/constant/url";
import useAuthStore from "@/store/AuthStore";

const { DASHBOARD } = linkPaths;

const useAuthenticate = () => {
  const navigate = useNavigate();

  const [auth, setAuth] = useAuthStore((state) => [state.auth, state.setAuth]);

  const { isAuth } = auth;

  const onAuthenticate = async () => {
    const response = await authenticate();
    if (!response.success) return;
    setAuth(response.data);
    navigate(DASHBOARD);
  };

  useEffect(() => {
    if (!isAuth) onAuthenticate();
  }, []);
};

export default useAuthenticate;
