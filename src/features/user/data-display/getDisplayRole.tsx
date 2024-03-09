import { Badge } from "@/components/UI";
import { ERole } from "@/services/user/enum";
import { Lang } from "@/common/type";

const getDisplayRole = (lang: Lang, role: ERole) => {
  const roles: Record<number, string> = {
    [ERole.MANAGER]: lang.options.role.manager,
    [ERole.LEADER]: lang.options.role.leader,
    [ERole.STAFF]: lang.options.role.staff,
    [ERole.CUSTOMER]: lang.options.role.customer,
  };

  const color: Record<number, any> = {
    [ERole.MANAGER]: "red",
    [ERole.LEADER]: "pink",
    [ERole.STAFF]: "purple",
    [ERole.CUSTOMER]: "green",
  };
  return (
    <Badge shape="square" color={color[role]}>
      {roles[role]}
    </Badge>
  );
};

export default getDisplayRole;
