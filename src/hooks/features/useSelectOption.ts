import useLang from "./useLang";
import { EGender, ERole } from "@/services/customer/enum";
import type { SelectOptions } from "@/components/Control/type";

const useSelectOption = () => {
  const { lang } = useLang();

  const gender: SelectOptions = [
    { label: lang.options.gender.male, value: EGender.MALE },
    { label: lang.options.gender.female, value: EGender.FEMALE },
  ];

  const role: SelectOptions = [
    { label: lang.options.role.superAdmin, value: ERole.SUPER_ADMIN },
    { label: lang.options.role.admin, value: ERole.ADMIN },
    { label: lang.options.role.customer, value: ERole.CUSTOMER },
  ];

  return { gender, role };
};

export default useSelectOption;
