import { useTranslation } from "react-i18next";
import { Divider, Header, Icon, Image, Popup } from "semantic-ui-react";
import { Author } from "../../../interfaces/author";
import { Interweave } from "interweave";
import { Fragment } from "react/jsx-runtime";

interface AuthorsProps {
  authors?: Author[];
}
export const Authors = ({ authors }: AuthorsProps) => {
  const { t } = useTranslation();

  return (
    <div id="authors">
      <Header
        as={"h2"}
        dividing
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        {t("About the author(s)")}
        <div>
          <Popup
            header={t("About the author(s)")}
            content={t("Authors of the records")}
            trigger={<Icon name="info circle" />}
          />
        </div>
      </Header>
      {authors?.map((author, index, array) => (
        <Fragment key={index}>
          <div
            style={{
              display: "flex",
              gap: 20,
              alignItems: "flex-start",
            }}
          >
            <Image
              src={`https://ui-avatars.com/api/?name=${author.name}&background=65a20c&color=fff&rounded=true&bold=true&format=svg`}
              size="medium"
              circular
            />
            <div>
              <Header as="h3">{author.name}</Header>
              <Interweave content={author.biography} />
            </div>
          </div>
          {array.length - 1 !== index && <Divider section />}
        </Fragment>
      ))}
    </div>
  );
};
