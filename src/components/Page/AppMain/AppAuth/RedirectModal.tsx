import { FC } from "react";
import { Modal, Typography } from "@/components/UI";
import { useLang } from "@/hooks";
import type { ModalProps } from "@/components/UI/Modal";

const { Paragraph } = Typography;

interface RedirectModalProps extends ModalProps {}

const RedirectModal: FC<RedirectModalProps> = ({ ...restProps }) => {
  const { lang } = useLang();

  const modalDefaultProps: ModalProps = {
    color: "green",
    sizes: "sm",
    hasHead: false,
    backdropClose: false,
    hasCloseIcon: false,
    hasCancelButton: false,
    okButtonTitle: lang.auth.modal.relogin,
    ...restProps,
  };

  return (
    <Modal {...modalDefaultProps}>
      <Paragraph>{lang.auth.modal.note}</Paragraph>
    </Modal>
  );
};

export default RedirectModal;
