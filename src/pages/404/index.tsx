import { FC } from "react";
import { Space, Typography } from "@/components/UI";
import { useLang } from "@/hooks";
import { BsEmojiFrown } from "react-icons/bs";

const { Paragraph } = Typography;

const NotFound: FC<{}> = () => {
  const { lang } = useLang();

  return (
    <div className="not-found">
      <div className="not-found-content">
        <Space justify="center" align="middle" rootClassName="content-icon">
          <BsEmojiFrown size={40} />
          <Paragraph size={50} weight={600} variant="success">
            404
          </Paragraph>
        </Space>
        <Paragraph align="center" size={30}>
          {lang.notFound.description}
        </Paragraph>
      </div>
    </div>
  );
};

export default NotFound;
