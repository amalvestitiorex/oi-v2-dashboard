import { FC, useEffect, useState } from "react";
import { Button, Table } from "semantic-ui-react";
import { Koha } from "../../../interfaces/koha";
import styles from "./KohaRecords.module.css";
import { useMutation } from "react-query";
import { IUploadCsvRecords } from "../../../interfaces/records";
import { uploadCsvRecords } from "../../../services/records.service";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { map } from "lodash";
import { useTranslation } from "react-i18next";

interface IUploadRecods {
  biblionumber: string;
  code: string;
  author: string;
  otherauthors: string;
  corporateauthor: string;
  title: string;
  year: string;
  editorial: string;
  article_source: string;
  article_issn: string;
  type: string;
}

export const KohaRecords: FC<{ records?: Koha[] }> = ({ records }) => {
  const { user } = useSelector((state: RootState) => state.auth);
  const [uploadRecords, setUploadRecords] = useState<IUploadRecods[]>([]);
  const { t } = useTranslation();
  const mutation = useMutation({
    mutationFn: (data: IUploadCsvRecords) => {
      return uploadCsvRecords(data);
    },
  });

  const handleUpload = () => {
    const csv = generateCsv();
    const data = new FormData();
    data.append("file", csv);
    const userData = {
      name: user.name,
      email: user.email,
      password: user.password,
      base_url: user.base_url,
      role: user.role,
      active: user.active,
    };

    data.append("user", JSON.stringify(userData));
    mutation.mutate({ data });
  };

  const generateCsv = () => {
    const csvString = [
      [
        "biblionumber",
        "record.",
        "author",
        "otherauthors",
        "corporateauthor",
        "title",
        "year",
        "editorial",
        "article_source",
        "article_issn",
        "type",
      ],
      ...uploadRecords.map((item: IUploadRecods) => [
        item.biblionumber,
        item.code,
        item.author,
        item.otherauthors,
        item.corporateauthor,
        item.title,
        item.year,
        item.editorial,
        item.article_source,
        item.article_issn,
        item.type,
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csvString], { type: "text/csv" });

    return new File([blob], "filename");
  };

  useEffect(() => {
    const parseData = (record: Koha) => {
      const code = record.marcxml.datafield
        .filter(
          (field) =>
            field.tag === "017" ||
            field.tag === "020" ||
            field.tag === "022" ||
            field.tag === "024"
        )
        .map((field) => field.subfield)
        .map((subfield) => {
          if (!Array.isArray(subfield) && subfield.code === "a")
            return subfield.$t;
          else if (Array.isArray(subfield)) {
            return subfield
              .map((subfield) => {
                if (subfield.code === "a") return subfield.$t;
              })
              .filter((subfield) => subfield !== undefined);
          }
        });
      const author = record.marcxml.datafield
        .filter((field) => field.tag === "100")
        .map((field) => field.subfield)
        .map((subfield) => {
          if (!Array.isArray(subfield) && subfield.code === "a") {
            return subfield.$t;
          } else if (Array.isArray(subfield)) {
            return subfield
              .map((subfield) => {
                if (subfield.code === "a") return subfield.$t;
              })
              .filter((subfield) => subfield !== undefined);
          }
        });
      const otherauthors = record.marcxml.datafield
        .filter((field) => field.tag === "700")
        .map((field) => field.subfield)
        .map((subfield) => {
          if (!Array.isArray(subfield) && subfield.code === "a") {
            return subfield.$t;
          } else if (Array.isArray(subfield)) {
            return subfield
              .map((subfield) => {
                if (subfield.code === "a") return subfield.$t;
              })
              .filter((subfield) => subfield !== undefined);
          }
        });
      const corporateauthor = record.marcxml.datafield
        .filter((field) => field.tag === "710")
        .map((field) => field.subfield)
        .map((subfield) => {
          if (!Array.isArray(subfield) && subfield.code === "a") {
            return subfield.$t;
          } else if (Array.isArray(subfield)) {
            return subfield
              .map((subfield) => {
                if (subfield.code === "a") return subfield.$t;
              })
              .filter((subfield) => subfield !== undefined);
          }
        });
      const title = record.marcxml.datafield
        .filter((field) => field.tag === "245")
        .map((field) => field.subfield)
        .map((subfield) => {
          if (
            !Array.isArray(subfield) &&
            (subfield.code === "a" ||
              subfield.code === "b" ||
              subfield.code === "c")
          )
            return subfield.$t;
          else if (Array.isArray(subfield)) {
            return subfield
              .map((subfield) => {
                if (
                  subfield.code === "a" ||
                  subfield.code === "b" ||
                  subfield.code === "c"
                )
                  return subfield.$t;
              })
              .filter((subfield) => subfield !== undefined);
          }
        });
      const year = record.marcxml.datafield
        .filter((field) => field.tag === "264" || field.tag === "260")
        .map((field) => field.subfield)
        .map((subfield) => {
          if (!Array.isArray(subfield) && subfield.code === "c")
            return subfield.$t;
          else if (Array.isArray(subfield)) {
            return subfield
              .map((subfield) => {
                if (subfield.code === "c") return subfield.$t;
              })
              .filter((subfield) => subfield !== undefined);
          }
        });

      const editorial = record.marcxml.datafield
        .filter((field) => field.tag === "264" || field.tag === "260")
        .map((field) => field.subfield)
        .map((subfield) => {
          if (
            !Array.isArray(subfield) &&
            (subfield.code === "b" || subfield.code === "a")
          )
            return subfield.$t;
          else if (Array.isArray(subfield)) {
            return subfield
              .map((subfield) => {
                if (subfield.code === "b" || subfield.code === "a")
                  return subfield.$t;
              })
              .filter((subfield) => subfield !== undefined);
          }
        });

      const article_source = record.marcxml.datafield
        .filter((field) => field.tag === "773")
        .map((field) => field.subfield)
        .map((subfield) => {
          if (!Array.isArray(subfield) && subfield.code === "t")
            return subfield.$t;
          else if (Array.isArray(subfield)) {
            return subfield
              .map((subfield) => {
                if (subfield.code === "t") return subfield.$t;
              })
              .filter((subfield) => subfield !== undefined);
          }
        });
      const article_issn = record.marcxml.datafield
        .filter((field) => field.tag === "773")
        .map((field) => field.subfield)
        .map((subfield) => {
          if (!Array.isArray(subfield) && subfield.code === "x")
            return subfield.$t;
          else if (Array.isArray(subfield)) {
            return subfield
              .map((subfield) => {
                if (subfield.code === "x") return subfield.$t;
              })
              .filter((subfield) => subfield !== undefined);
          }
        });
      const type = record.marcxml.datafield.filter(
        (field) =>
          field.tag === "020" || field.tag === "022" || field.tag === "024"
      );
      setUploadRecords((prevUploadRecords: IUploadRecods[]) => [
        ...prevUploadRecords,
        {
          biblionumber: record.biblionumber,
          code: code.join(", "),
          author: author.join(", "),
          otherauthors: otherauthors.join(", "),
          corporateauthor: corporateauthor.join(", "),
          title: title.join(", "),
          year: year.join(", "),
          editorial: editorial.join(", "),
          article_source: article_source.join(", "),
          article_issn: article_issn.join(", "),
          type:
            type[0]?.tag === "020"
              ? "book"
              : type[0]?.tag === "022"
              ? "magazine"
              : "article",
        },
      ]);
    };

    map(records, (record) => parseData(record));
  }, [records]);

  return (
    <div>
      <Button onClick={handleUpload}>{t("Upload records")}</Button>
      <Table color="olive" columns={11} celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell style={{ textAlign: "center" }}>
              {t("ID")}
            </Table.HeaderCell>
            <Table.HeaderCell style={{ textAlign: "center" }}>
              {t("Code")}
            </Table.HeaderCell>
            <Table.HeaderCell style={{ textAlign: "center" }}>
              {t("Author")}
            </Table.HeaderCell>
            <Table.HeaderCell>{t("Other Authors")}</Table.HeaderCell>
            <Table.HeaderCell>{t("Corporate Author")}</Table.HeaderCell>
            <Table.HeaderCell>{t("Title")}</Table.HeaderCell>
            <Table.HeaderCell>{t("Year")}</Table.HeaderCell>
            <Table.HeaderCell>{t("Editorial")}</Table.HeaderCell>
            <Table.HeaderCell>{t("Article Source")}</Table.HeaderCell>
            <Table.HeaderCell>{t("Article ISSN")}</Table.HeaderCell>
            <Table.HeaderCell>{t("Type")}</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {uploadRecords.map((record: IUploadRecods) => {
            return (
              <Table.Row key={record.biblionumber}>
                <Table.Cell>{record.biblionumber}</Table.Cell>
                <Table.Cell>
                  <p className={styles.lineClamp1}>{record.code}</p>
                </Table.Cell>
                <Table.Cell>
                  <p className={styles.lineClamp1}>{record.author}</p>
                </Table.Cell>
                <Table.Cell>
                  <p className={styles.lineClamp1}>{record.otherauthors}</p>
                </Table.Cell>
                <Table.Cell>
                  <p className={styles.lineClamp1}>{record.corporateauthor}</p>
                </Table.Cell>
                <Table.Cell>
                  <p className={styles.lineClamp1}>{record.title}</p>
                </Table.Cell>
                <Table.Cell>{record.year}</Table.Cell>
                <Table.Cell>
                  <p className={styles.lineClamp1}>{record.editorial}</p>
                </Table.Cell>
                <Table.Cell>{record.article_source}</Table.Cell>
                <Table.Cell>{record.article_issn}</Table.Cell>
                <Table.Cell>
                  <p style={{ textTransform: "capitalize" }}>{record.type}</p>
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
    </div>
  );
};
