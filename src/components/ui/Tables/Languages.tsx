import { useTranslation } from "react-i18next";
import { Button, Icon, Table } from "semantic-ui-react";
import { Language } from "../../../interfaces/languages";
import { useMutation, useQueryClient } from "react-query";
import { deleteLanguage } from "../../../services/languages.service";

interface LanguagesProps {
  languages: Language[];
}

export const Languages = ({ languages }: LanguagesProps) => {
  const { t } = useTranslation();

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (id?: string) => deleteLanguage(id),
    onSuccess: () => {
      queryClient.invalidateQueries("languages");
    },
  });

  return (
    <Table color="olive" columns={3}>
      <Table.Header>
        <Table.Row style={{ textAlign: "center" }}>
          <Table.HeaderCell>{t("Name")}</Table.HeaderCell>
          <Table.HeaderCell>{t("Key")}</Table.HeaderCell>
          <Table.HeaderCell>{t("Actions")}</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {languages?.map((language: Language) => (
          <Table.Row style={{ textAlign: "center" }} key={language._id}>
            <Table.Cell>
              <p style={{ textTransform: "capitalize" }}>{t(language.name)}</p>
            </Table.Cell>
            <Table.Cell>
              <p style={{ textTransform: "uppercase" }}>{language.key}</p>
            </Table.Cell>
            <Table.Cell>
              <Button
                animated="vertical"
                color="red"
                size="small"
                onClick={() => mutation.mutate(language._id)}
              >
                <Button.Content hidden>{t("Delete")}</Button.Content>
                <Button.Content visible>
                  <Icon name="trash" />
                </Button.Content>
              </Button>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
};
