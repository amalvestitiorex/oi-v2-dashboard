import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useMutation, useQueryClient } from "react-query";
import { Form, Header, Icon, Segment } from "semantic-ui-react";
import { IUploadCsvRecords } from "../../../../interfaces/records";
import { User } from "../../../../interfaces/users";
import { uploadCsvRecords } from "../../../../services/records.service";
import "./CsvFileForm.module.css";
import { useNavigate, useParams } from "react-router-dom";

interface CsvFileFormProps {
  userSelected: User;
}

export const CsvFileForm = ({ userSelected }: CsvFileFormProps) => {
  const { t } = useTranslation();
  const [file, setFile] = useState<File>();
  const queryClient = useQueryClient();
  const navigation = useNavigate();
  const { lang } = useParams();

  const mutation = useMutation({
    mutationFn: (data: IUploadCsvRecords) => {
      return uploadCsvRecords(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries("records");
    },
  });

  const handleSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setFile(file);
  };

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (file) {
      console.log((e.target as HTMLFormElement).value);
      const data = new FormData();
      data.append("file", file);
      data.append("user", JSON.stringify(userSelected));
      mutation.mutate({ data });
      navigation(`/${lang}/records`);
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
