import { Badge } from "@/components/UI";
import { ERole } from "@/services/customer/enum";
import { Lang } from "@/common/type";

const getDisplayRole = (lang: Lang, role: ERole) => {
  const roles: Record<number, string> = {
    [ERole.SUPER_ADMIN]: lang.options.role.superAdmin,
    [ERole.ADMIN]: lang.options.role.admin,
    [ERole.CUSTOMER]: lang.options.role.customer,
  };

  const color: Record<number, any> = {
    [ERole.SUPER_ADMIN]: "red",
    [ERole.ADMIN]: "purple",
    [ERole.CUSTOMER]: "green",
  };
  return (
    <Badge shape="square" color={color[role]}>
      {roles[role]}
    </Badge>
  );
};

export default getDisplayRole;
