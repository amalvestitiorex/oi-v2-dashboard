import { useTranslation } from "react-i18next";
import { Button, Image, Modal } from "semantic-ui-react";
import { DataBiblionumber, DataIsbn } from "../../../interfaces/elastic";

interface RecommendationModalProps {
  setOpen: (open: boolean) => void;
  open: boolean;
  record: DataBiblionumber | DataIsbn;
}

export const RecommendationModal = ({
  setOpen,
  open,
  record,
}: RecommendationModalProps) => {
  const { t } = useTranslation();

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
    >
      <Modal.Header>{record?.title}</Modal.Header>
      <Modal.Content image>
        <Image size="medium" src={record.image} wrapped />
        <Modal.Description>
          {t("Author(s)")}:<p style={{ opacity: 0.6 }}>{record?.author}</p>
          {record?.resumen && (
            <>
              {t("Summary")}:<p>{record?.resumen}</p>
            </>
          )}
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
