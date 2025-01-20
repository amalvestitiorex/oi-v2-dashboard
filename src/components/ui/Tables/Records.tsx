import { Button, Icon, Pagination, Table } from "semantic-ui-react";
import styles from "./Records.module.css";
import { FC } from "react";
import { PaginationRecords, Record } from "../../../interfaces/records";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { useParams, useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

interface RecordsProps {
  records?: PaginationRecords;
}

export const Records: FC<RecordsProps> = ({ records }) => {
  const { user } = useSelector((state: RootState) => state.auth);
  const [searchParams, setSearchParams] = useSearchParams();
  const { lang } = useParams();
  const { t } = useTranslation();
  const page = parseInt(searchParams.get("page") || "1");
  return (
    <>
      <Table color="olive">
        <Table.Header>
          <Table.Row style={{ textAlign: "center" }}>
            <Table.HeaderCell>{t("ID")}</Table.HeaderCell>
            <Table.HeaderCell> {t("Title / Authors")}</Table.HeaderCell>
            {user.role === "admin" && (
              <>
                <Table.HeaderCell>{t("User")}</Table.HeaderCell>
                <Table.HeaderCell>{t("Quality")}</Table.HeaderCell>
              </>
            )}
            <Table.HeaderCell>{t("Date")}</Table.HeaderCell>
            <Table.HeaderCell>{t("Type")}</Table.HeaderCell>
            <Table.HeaderCell>{t("Actions")}</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {records?.docs.map((record: Record) => (
            <Table.Row key={record._id} style={{ textAlign: "center" }}>
              <Table.Cell>
                <a
                  href={`${record.user?.base_url}cgi-bin/koha/opac-detail.pl?biblionumber=${record.id}`}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 2,
                    fontWeight: "bold",
                    color: "green",
                  }}
                >
                  <Icon name="file alternate" />
                  {record.id}
                </a>
              </Table.Cell>
              <Table.Cell>
                <p className={styles.lineClamp1} style={{ fontWeight: "bold" }}>
                  {record.title}
                </p>
                <span
                  className={styles.lineClamp1}
                  style={{ fontSize: "0.8em", opacity: 0.7 }}
                >
                  {record.authors?.map((author) => author.name).join(", ")}
                </span>
              </Table.Cell>
              {user.role === "admin" && (
                <>
                  <Table.Cell width={2} style={{ textTransform: "capitalize" }}>
                    {record.user?.name}
                  </Table.Cell>
                  <Table.Cell>{record.quality}</Table.Cell>
                </>
              )}
              <Table.Cell>
                {new Date(record.updatedAt).toLocaleDateString()}
              </Table.Cell>
              <Table.Cell>
                <p style={{ textTransform: "capitalize" }}>{record.type}</p>
              </Table.Cell>
              <Table.Cell>
                <Button
                  animated="vertical"
                  color="olive"
                  size="small"
                  as="a"
                  href={`/${lang}/record/${record._id}`}
                >
                  <Button.Content hidden>{t("View")}</Button.Content>
                  <Button.Content visible>
                    <Icon name="eye" />
                  </Button.Content>
                </Button>
              </Table.Cell>
            </Table.Row>
          ))}
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
