import { useEffect } from "react";
import { useLang } from "@/hooks";
import { useNavigate } from "react-router";
import { authenticate } from "@/services/auth/api";
import { linkPaths } from "@/common/constant/url";
import useMessage from "@/components/UI/ToastMessage/useMessage";
import useAuthStore from "@/store/AuthStore";

const { DASHBOARD } = linkPaths;

const useAuthenticate = () => {
  const { lang } = useLang();

  const messageApi = useMessage();

  const navigate = useNavigate();

  const setAuth = useAuthStore((state) => state.setAuth);

  const onAuthenticate = async () => {
    const response = await authenticate();
    if (!response.success) return messageApi.error(lang.auth.modal.note);
    setAuth(response.data);
    navigate(DASHBOARD);
  };

  useEffect(() => {
    onAuthenticate();
  }, []);
};

export default useAuthenticate;
