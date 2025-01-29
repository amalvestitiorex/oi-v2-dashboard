import { Card, Header, Icon, Image, Popup, Rating } from "semantic-ui-react";
import { Review } from "../../../interfaces/records";
import { t } from "i18next";

interface ReviewsProps {
  reviews?: Review[];
}

export const Reviews = ({ reviews }: ReviewsProps) => {
  return (
    <div id="reviews">
      <Header as={"h2"} dividing style={{ display: "flex", gap: 10 }}>
        {t("Reviews")}
        <div>
          <Popup
            content={t("This is a review of the product")}
            header={t("Reviews")}
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
        {reviews?.map((review, index) => (
          <Card key={index} color="olive" style={{ width: 200, margin: 0 }}>
            <Image
              src={`https://ui-avatars.com/api/?name=${review.name}&background=65a20c&color=fff&bold=true&format=svg`}
              wrapped
              ui={false}
            />
            <Card.Content>
              <Card.Header>{review.name}</Card.Header>
              <Card.Meta>
                <span className="date">{review.date}</span>
              </Card.Meta>
              <Card.Description>{review.comment}</Card.Description>
            </Card.Content>
            <Card.Content extra>
              <Rating
                icon="star"
                defaultRating={review.rating}
                maxRating={5}
                disabled
              />
            </Card.Content>
          </Card>
        ))}
      </div>
    </div>
  );
};
