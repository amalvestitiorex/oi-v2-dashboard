import { useTranslation } from "react-i18next";
import { Pagination, Table } from "semantic-ui-react";
import { Buys, PaginationBuys } from "../../../interfaces/records";
import { useSearchParams } from "react-router-dom";
import { size } from "lodash";

interface BuysProps {
  records?: PaginationBuys;
}

export const BuysTable = ({ records }: BuysProps) => {
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1");

  return (
    <>
      <Table color="olive">
        <Table.Header>
          <Table.Row style={{ textAlign: "center" }}>
            <Table.HeaderCell> {t("Title / Authors")}</Table.HeaderCell>
            <Table.HeaderCell>{t("Search counter")}</Table.HeaderCell>
            <Table.HeaderCell>{t("Price")}</Table.HeaderCell>
            <Table.HeaderCell>{t("Type")}</Table.HeaderCell>
            <Table.HeaderCell>{t("Actions")}</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {size(records?.docs) > 0 ? (
            records?.docs?.map((record: Buys) => (
              <Table.Row key={record._id} style={{ textAlign: "center" }}>
                <Table.Cell>
                  <p>
                    {record.title} / {record.author}
                  </p>
                </Table.Cell>
                <Table.Cell>
                  <p>{record.count}</p>
                </Table.Cell>
                <Table.Cell>
                  <p>{record.price}</p>
                </Table.Cell>
                <Table.Cell>
                  <p style={{ textTransform: "capitalize" }}>
                    {t(record.type)}
                  </p>
                </Table.Cell>
                <Table.Cell></Table.Cell>
              </Table.Row>
            ))
          ) : (
            <Table.Row>
              <Table.Cell colSpan="5" style={{ textAlign: "center" }}>
                <p>{t("No records found.")}</p>
              </Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
        <Table.Footer>
          <Table.Row style={{ textAlign: "center" }}>
            <Table.HeaderCell colSpan="7">
              <p style={{ fontSize: "0.9rem" }}>
                {t("Showing")}{" "}
                <span style={{ fontWeight: "bold" }}>
                  {records?.pagingCounter}
                </span>{" "}
                {t("to")}{" "}
                <span style={{ fontWeight: "bold" }}>
                  {records?.hasNextPage
                    ? records?.page * 20
                    : records?.totalDocs}
                </span>{" "}
                {t("of")}{" "}
                <span style={{ fontWeight: "bold" }}>{records?.totalDocs}</span>{" "}
                {t("records.")}
              </p>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Footer>
      </Table>
      <Pagination
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "1rem",
        }}
        defaultActivePage={page}
        firstItem={null}
        lastItem={null}
        onPageChange={(_e, { activePage }) => {
          if (activePage) {
            searchParams.set("page", activePage.toString());
            setSearchParams(searchParams);
          }
        }}
        pointing
        secondary
        totalPages={records?.totalPages || 1}
      />
    </>
  );
};
