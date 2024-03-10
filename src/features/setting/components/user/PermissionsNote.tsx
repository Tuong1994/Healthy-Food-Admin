import { FC } from "react";
import { Lang } from "@/common/type";
import { Card, Typography } from "@/components/UI";

const { Paragraph } = Typography;

interface PermissionsNoteProps {
  lang: Lang;
}

const PermissionsNote: FC<PermissionsNoteProps> = ({ lang }) => {
  return (
    <Card>
      <Paragraph align="center" variant="secondary">{lang.setting.user.note}</Paragraph>
    </Card>
  );
};

export default PermissionsNote;
