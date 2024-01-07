import useLang from "../features/useLang";
import { EGender } from "@/services/customer/enum";

const useDisplayGender = (genderEnum: EGender) => {
  const { lang } = useLang();

  const genders: Record<number, string> = {
    [EGender.MALE]: lang.options.gender.male,
    [EGender.FEMALE]: lang.options.gender.female,
  };

  const gender = genders[genderEnum] ?? "";

  return gender;
};

export default useDisplayGender;
