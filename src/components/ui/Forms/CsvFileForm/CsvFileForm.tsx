import { useState } from "react";
import { useMutation } from "react-query";
import { Form, Header, Icon, Segment } from "semantic-ui-react";
import { IUploadCsvRecords } from "../../../../interfaces/records";
import { uploadCsvRecords } from "../../../../services/records.service";
import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";
import "./CsvFileForm.module.css";
import { useTranslation } from "react-i18next";

export const CsvFileForm = () => {
  const { t } = useTranslation();
  const { user } = useSelector((state: RootState) => state.auth);
  const [file, setFile] = useState<File>();

  const mutation = useMutation({
    mutationFn: (data: IUploadCsvRecords) => {
      return uploadCsvRecords(data);
    },
  });

  const handleSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setFile(file);
  };

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (file) {
      const data = new FormData();
      data.append("file", file);
      data.append("user", JSON.stringify(user));
      mutation.mutate({ data });
    }
  };

  return (
    <Form onSubmit={handleOnSubmit}>
      <Segment placeholder>
        <Form.Field style={{ maxWidth: "100%" }}>
          <label
            htmlFor="file"
            style={{
              cursor: "pointer",
              textAlign: "center",
              padding: "10px",
            }}
          >
            <Header icon>
              <Icon name="file outline" />
              {t("Select ")}
              Select a file from your device or drag it here.
            </Header>
          </label>
          <input
            id="file"
            name="file"
            type="file"
            accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
            style={{ display: "none" }}
            onChange={handleSelectFile}
          />
        </Form.Field>
        <Form.Button type="submit" primary disabled={!file}>
          Subir
        </Form.Button>
      </Segment>
    </Form>
  );
};
