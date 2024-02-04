import { FC, Fragment } from "react";
import { Divider, Typography, UList } from "@/components/UI";
import { useLang } from "@/hooks";
import Logo from "@/components/Page/Logo";

const { Paragraph } = Typography;

const { List, ListItem } = UList;

interface AuthLogoProps {}

const AuthLogo: FC<AuthLogoProps> = () => {
  const { lang } = useLang();

  return (
    <Fragment>
      <Logo rootClassName="content-logo" width={400} height={150} />
      <List rootClassName="content-list">
        <ListItem>
          <Paragraph size={16}>{lang.auth.content_1}</Paragraph>
        </ListItem>
        <ListItem>
          <Paragraph size={16}>{lang.auth.content_2}</Paragraph>
        </ListItem>
        <ListItem>
          <Paragraph size={16}>{lang.auth.content_3}</Paragraph>
        </ListItem>
      </List>
    </Fragment>
  );
};

export default AuthLogo;
