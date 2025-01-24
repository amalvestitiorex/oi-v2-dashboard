import { useTranslation } from "react-i18next";
import { Divider, Grid, Header, Icon, Image, Popup } from "semantic-ui-react";
import { Author } from "../../../interfaces/author";
import { Interweave } from "interweave";
import { Fragment } from "react/jsx-runtime";
import { size, split } from "lodash";
import styles from "./Authors.module.css";
import { useQuery } from "react-query";
import axios from "axios";

interface AuthorsProps {
  authors?: Author[];
}
export const Authors = ({ authors }: AuthorsProps) => {
  const { t } = useTranslation();

  const AuthorItem = ({
    author,
    index,
    array,
  }: {
    author: Author;
    index: number;
    array: Author[];
  }) => {
    const orcid = split(author.ORCID, "http://orcid.org/")[1];

    const { data: res } = useQuery(
      ["orcid", orcid],
      () => axios.get(`https://api.crossref.org/works?filter=orcid:${orcid}`),
      { enabled: !!orcid }
    );

    return (
      <Fragment>
        <div
          style={{
            display: "flex",
            gap: 20,
            alignItems: "flex-start",
          }}
        >
          <Grid columns={3}>
            <Grid.Row>
              <Grid.Column width={3}>
                <Image
                  src={`https://ui-avatars.com/api/?name=${author.name}&background=65a20c&color=fff&rounded=true&bold=true&format=svg`}
                  size="small"
                  circular
                  style={{ minWidth: 100 }}
                />
              </Grid.Column>
              <Grid.Column
                width={4}
                style={{ display: "flex", flexDirection: "column", gap: 10 }}
              >
                <Header
                  as="h3"
                  style={{
                    alignItems: "center",
                    display: "flex",
                    gap: 10,
                  }}
                >
                  {author.name}{" "}
                  {author.ORCID && (
                    <Image
                      as={"a"}
                      src={"/orcid.png"}
                      href={author.ORCID}
                      size="mini"
                      style={{ cursor: "pointer", minWidth: 30 }}
                      target="_blank"
                    />
                  )}
                </Header>
                {size(author.affiliation) > 0 && (
                  <div>
                    <span style={{ fontWeight: "bold" }}>
                      {t("Affiliation(s)")}
                    </span>
                    :{" "}
                    {author.affiliation
                      .map((affiliation) => affiliation.name)
                      .join(", ")}
                  </div>
                )}
                {res?.data.message["total-results"] > 0 && (
                  <div>
                    <span style={{ fontWeight: "bold" }}>
                      {t("Publications")}
                    </span>
                    : {res?.data.message["total-results"]}
                  </div>
                )}
              </Grid.Column>
              <Grid.Column width={9}>
                <Interweave
                  className={styles.interweave}
                  content={author.biography}
                />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </div>
        {array.length - 1 !== index && <Divider section />}
      </Fragment>
    );
  };

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
        <AuthorItem author={author} index={index} array={array} key={index} />
      ))}
    </div>
  );
};
