import useAuthStore from "@/store/AuthStore";

const usePermission = () => {
  const auth = useAuthStore((state) => state.auth);

  const { info } = auth;

  const canCreate = info.permission ? info.permission.create : false;

  const canUpdate = info.permission ? info.permission.update : false;

  const canRemove = info.permission ? info.permission.remove : false;

  return { canCreate, canUpdate, canRemove };
};

export default usePermission;
