import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Card, Header, Icon, Image, Popup } from "semantic-ui-react";
import { OtherRecords } from "../../../interfaces/records";
import { AlsoLikeModal } from "../Modals/AlsoLikeModal";
import styles from "./styles.module.css";

interface AlsoLikeProps {
  otherRecords?: OtherRecords[];
  type?: "similarRecords" | "books" | "series" | "movies";
}
export const AlsoLike = ({ otherRecords, type }: AlsoLikeProps) => {
  const [recordSelected, setRecordSelected] = useState({} as OtherRecords);
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();

  return (
    <div id={type === "similarRecords" ? "similar_records" : type}>
      <Header
        as={"h2"}
        dividing
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        {type === "similarRecords" && t("You may also like")}
        {type === "books" && t("Books that might interest you")}
        {type === "series" && t("Series that might interest you")}
        {type === "movies" && t("Movies that might interest you")}
        <div>
          <Popup
            header={t("Recommendation")}
            content={t("Records that are similar to the current record")}
            trigger={<Icon name="info circle" />}
          />
        </div>
      </Header>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 20,
        }}
      >
        {otherRecords?.map((record, index) => (
          <Card
            key={index}
            color="olive"
            style={{ width: 150 }}
            onClick={() => {
              setRecordSelected(record);
              setOpen(true);
            }}
          >
            <Image src="/book.jpeg" wrapped ui={false} rounded />
            <Card.Content>
              <Card.Header>
                <p className={styles.lineClamp2} title={record.title}>
                  {record.title}
                </p>
              </Card.Header>
              <Card.Meta>
                <p
                  className={styles.lineClamp1}
                  title={record.authors.join(", ")}
                >
                  {record.authors.join(", ")}
                </p>
              </Card.Meta>
            </Card.Content>
          </Card>
        ))}
      </div>
      <AlsoLikeModal setOpen={setOpen} open={open} record={recordSelected} />
    </div>
  );
};
