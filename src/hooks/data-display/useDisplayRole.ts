import useLang from "../features/useLang";
import { ERole } from "@/services/customer/enum";

const useDisplayRole = (roleEnum: ERole) => {
  const { lang } = useLang();

  const roles: Record<number, string> = {
    [ERole.SUPER_ADMIN]: lang.options.role.superAdmin,
    [ERole.ADMIN]: lang.options.role.admin,
    [ERole.CUSTOMER]: lang.options.role.customer,
  };

  const role = roles[roleEnum] ?? "";

  return role;
};

export default useDisplayRole;
