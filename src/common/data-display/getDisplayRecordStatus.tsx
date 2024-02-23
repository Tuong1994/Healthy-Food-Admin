import { Badge } from "@/components/UI";
import { ERecordStatus } from "@/common/enum";
import type { Lang } from "@/common/type";

const getDisplayRecordStatus = (lang: Lang, status: ERecordStatus) => {
  const recordStatuses: Record<number, string> = {
    [ERecordStatus.DRAFT]: lang.options.recordStatus.draft,
    [ERecordStatus.ACTIVE]: lang.options.recordStatus.active,
  };

  const colors: Record<number, any> = {
    [ERecordStatus.DRAFT]: "orange",
    [ERecordStatus.ACTIVE]: "blue",
  };

  return (
    <Badge shape="square" color={colors[status]}>
      {recordStatuses[status]}
    </Badge>
  );
};

export default getDisplayRecordStatus;
