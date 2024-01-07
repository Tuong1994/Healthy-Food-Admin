import React from "react";
import { UI, Control } from "@/components";
import type { Lang } from "@/common/type";
import PasswordModal from "./PasswordModal";

const { Button, Card, Grid } = UI;

const { Row, Col } = Grid;

const { FormItem, Input, InputPassword, Upload } = Control;

const { ImageUpload } = Upload;

const { SingleImageUpload } = ImageUpload;

interface CustomerAuthProps {
  lang: Lang;
  isUpdate: boolean;
}

const CustomerAuth: React.FC<CustomerAuthProps> = ({ lang, isUpdate }) => {
  const [open, setOpen] = React.useState<boolean>(false);

  const handleOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  return (
    <React.Fragment>
      <Card rootClassName="card-section">
        <Row justify="between">
          <Col xs={24} md={6} lg={6} span={6}>
            <SingleImageUpload />
          </Col>
          <Col xs={24} md={18} lg={18} span={18}>
            <FormItem name="email" disabled={isUpdate}>
              <Input label={lang.common.form.label.email} />
            </FormItem>
            {!isUpdate ? (
              <FormItem name="password">
                <InputPassword label={lang.common.form.label.password} />
              </FormItem>
            ) : (
              <Button color="red" ghost onClick={handleOpen}>
                {lang.customer.form.changePass}
              </Button>
            )}
          </Col>
        </Row>
      </Card>
      <PasswordModal lang={lang} open={open} onCancel={handleClose} />
    </React.Fragment>
  );
};

export default CustomerAuth;
