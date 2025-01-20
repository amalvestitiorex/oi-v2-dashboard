import { useTranslation } from "react-i18next";
import { Table } from "semantic-ui-react";
import { AverageCosts } from "../../../interfaces/records";

interface Props {
  averageCosts: AverageCosts;
}

export const AverageCost = ({ averageCosts }: Props) => {
  const { t } = useTranslation();

  return (
    <Table color="olive" columns={3}>
      <Table.Header>
        <Table.Row style={{ textAlign: "center" }}>
          <Table.HeaderCell>{t("Type")}</Table.HeaderCell>
          <Table.HeaderCell>{t("Average Cost")}</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {Object.keys(averageCosts).map((type, index) => (
          <Table.Row style={{ textAlign: "center" }} key={index}>
            <Table.Cell>
              <p style={{ textTransform: "capitalize" }}>{type}</p>
            </Table.Cell>
            <Table.Cell>
              <p style={{ textTransform: "capitalize" }}>
                {averageCosts[type]}
              </p>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
};
