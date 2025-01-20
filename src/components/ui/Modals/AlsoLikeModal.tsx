import { useTranslation } from "react-i18next";
import { Button, Image, Modal } from "semantic-ui-react";
import { OtherRecords } from "../../../interfaces/records";

interface AlsoLikeModalProps {
  setOpen: (open: boolean) => void;
  open: boolean;
  record: OtherRecords;
}

export const AlsoLikeModal = ({
  setOpen,
  open,
  record,
}: AlsoLikeModalProps) => {
  const { t } = useTranslation();

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
    >
      <Modal.Header>{record?.title}</Modal.Header>
      <Modal.Content image>
        <Image size="medium" src="/book.jpeg" wrapped />
        <Modal.Description>
          {t("Author(s)")}:
          <p style={{ opacity: 0.6 }}>{record?.authors?.join(", ")}</p>
          {t("Summary")}:<p>{record?.summary}</p>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button color="black" onClick={() => setOpen(false)}>
          {t("Close")}
        </Button>
      </Modal.Actions>
    </Modal>
  );
};
