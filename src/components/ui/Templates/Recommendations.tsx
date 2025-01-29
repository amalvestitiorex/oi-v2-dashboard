import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Card, Header, Icon, Image, Popup, Rating } from "semantic-ui-react";
import {
  DataBiblionumber,
  DataIsbn,
  IRecommendations,
} from "../../../interfaces/elastic";
import { User } from "../../../interfaces/users";
import { addBuy } from "../../../services/records.service";
import { RecommendationModal } from "../Modals/RecommendationModal";
import styles from "./styles.module.css";
import { Dilve } from "../../../interfaces/records";

interface RecommendationsProps {
  recommendations?: IRecommendations;
  user?: User;
  dilve?: Dilve;
}

interface ItemCardProps {
  record: DataBiblionumber | DataIsbn;
}

export const Recommendations = ({
  recommendations,
  user,
  dilve,
}: RecommendationsProps) => {
  const { t } = useTranslation();
  const [recordSelected, setRecordSelected] = useState(
    {} as DataBiblionumber | DataIsbn
  );
  const [open, setOpen] = useState(false);

  useEffect(() => {
    (async () => {
      if ((recommendations?.dataIsbn ?? []).length > 0) {
        recommendations?.dataIsbn?.forEach(async (element) => {
          const buy = {
            title: element.title,
            author: element.author,
            count: 1,
            type: "book",
            price: Number(
              dilve?.getRecordsXResponse.ONIXMessage.Product.ProductSupply
                .SupplyDetail.Price.PriceAmount || 0
            ),
            user: user?._id,
          };
          await addBuy({ data: buy });
        });
      }
    })();
  }, [recommendations, user, dilve]);

  const ItemCard = ({ record }: ItemCardProps) => (
    <Card
      color="olive"
      style={{ width: 150, margin: 0 }}
      onClick={() => {
        setRecordSelected(record);
        setOpen(true);
      }}
    >
      <Image
        src={record.image ? record.image : "/book.jpeg"}
        style={{ height: 200, resizeMode: "cover" }}
        rounded
      />
      <Card.Content>
        <Card.Header>
          <p className={styles.lineClamp2} title={record.title}>
            {record.title}
          </p>
        </Card.Header>
        <Card.Meta>
          <span className="date">{record.author}</span>
        </Card.Meta>
        <Card.Description>
          {dilve?.getRecordsXResponse.ONIXMessage.Product.ProductSupply
            .SupplyDetail.Price && (
            <>
              €{" "}
              {
                dilve?.getRecordsXResponse.ONIXMessage.Product.ProductSupply
                  .SupplyDetail.Price.PriceAmount
              }
            </>
          )}
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        {record?.rating && (
          <Rating
            icon="star"
            defaultRating={Math.ceil(record?.rating * 5)}
            maxRating={5}
            disabled
          />
        )}
      </Card.Content>
    </Card>
  );

  return (
    <div>
      {(recommendations?.dataBiblionumber?.length ?? 0) > 0 && (
        <Header as={"h2"} dividing style={{ display: "flex", gap: 10 }}>
          {t("Librarian recommendations")}
          <div>
            <Popup
              header={t("Librarian recommendations")}
              content={t(
                "These are the recommendations made by the librarians of your library"
              )}
              trigger={<Icon name="info circle" />}
            />
          </div>
        </Header>
      )}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 20,
        }}
      >
        {recommendations?.dataBiblionumber?.map((element, index) => (
          <ItemCard key={index} record={element} />
        ))}
      </div>
      {(recommendations?.dataIsbn?.length ?? 0) > 0 && (
        <Header
          as={"h2"}
          dividing
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          {t("Other libraries recommend")}
          <div>
            <Popup
              header={t("Other libraries recommend")}
              content={t(
                "These are the recommendations made by the librarians of other libraries"
              )}
              trigger={<Icon name="info circle" />}
            />
          </div>
        </Header>
      )}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 20,
        }}
      >
        {recommendations?.dataIsbn?.map((element, index) => (
          <ItemCard key={index} record={element} />
        ))}
      </div>
      <RecommendationModal
        setOpen={setOpen}
        open={open}
        record={recordSelected}
      />
    </div>
  );
};
