import { useEffect } from "react";
import { useNavigate } from "react-router";
import { linkPaths } from "@/common/constant/url";
import useAuthStore from "@/store/AuthStore";
import utils from "@/utils";

const { AUTH_SIGN_IN } = linkPaths;

const useRedirect = () => {
  const { pathname } = window.location;

  const auth = useAuthStore((state) => state.auth);

  const navigate = useNavigate();

  const { isAuth } = auth;

  // Redirect to login page if user haven't login
  useEffect(() => {
    const name = utils.getNameCurrentUrl(2);
    if (name === "resetPassword" || name === "forgotPassword") return;
    if (!isAuth) return navigate(AUTH_SIGN_IN);
  }, [pathname]);
};

export default useRedirect;
