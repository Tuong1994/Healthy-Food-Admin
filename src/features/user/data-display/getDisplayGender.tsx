import { Lang } from "@/common/type";
import { Badge } from "@/components/UI";
import { EGender } from "@/services/user/enum";

const getDisplayGender = (lang: Lang, gender: EGender) => {
  const genders: Record<number, string> = {
    [EGender.MALE]: lang.options.gender.male,
    [EGender.FEMALE]: lang.options.gender.female,
  };

  const color: Record<number, any> = {
    [EGender.MALE]: "blue",
    [EGender.FEMALE]: "pink",
  };
  return (
    <Badge ghost shape="square" color={color[gender]}>
      {genders[gender]}
    </Badge>
  );
};

export default getDisplayGender;
