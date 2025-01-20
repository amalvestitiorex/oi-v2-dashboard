import { size } from "lodash";
import { useTranslation } from "react-i18next";
import { Header, Icon, Popup, Table } from "semantic-ui-react";
import { StrongIssues, WeakIssues } from "../../../interfaces/records";

interface PointsProps {
  strength?: StrongIssues[];
  weakness?: WeakIssues[];
}

export const Points = ({ strength, weakness }: PointsProps) => {
  const { t } = useTranslation();

  return (
    <div>
      <Header
        as={"h2"}
        dividing
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        {t("Points of Interest")}
        <div>
          <Popup
            header={t("Points of Interest")}
            content={t("These are the points of interest")}
            trigger={<Icon name="info circle" />}
          />
        </div>
      </Header>
      <Table celled color="olive">
        <Table.Header style={{ textAlign: "center" }}>
          <Table.HeaderCell>{t("Strengths")}</Table.HeaderCell>
          <Table.HeaderCell>{t("Weaknesses")}</Table.HeaderCell>
        </Table.Header>
        <Table.Body>
          <Table.Row>
            <Table.Cell width={8} id="strong_issues">
              {size(strength) > 0 ? (
                strength?.map((point, index) => (
                  <p key={index}>
                    <Icon name="selected radio" color="green" />{" "}
                    <span
                      style={{
                        fontWeight: "bold",
                        textDecoration: "underline",
                      }}
                    >
                      {point.name}:
                    </span>{" "}
                    {point.description}
                  </p>
                ))
              ) : (
                <p>{t("No strengths")}</p>
              )}
            </Table.Cell>
            <Table.Cell
              width={8}
              id="weak_issues"
              style={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              {size(weakness) > 0 ? (
                weakness?.map((point, index) => (
                  <p key={index}>
                    <Icon name="selected radio" color="red" />{" "}
                    <span
                      style={{
                        fontWeight: "bold",
                        textDecoration: "underline",
                      }}
                    >
                      {point.name}:
                    </span>{" "}
                    {point.description}
                  </p>
                ))
              ) : (
                <p>{t("No weaknesses")}</p>
              )}
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </div>
  );
};
