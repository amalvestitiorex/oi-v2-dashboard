import { useTranslation } from "react-i18next";
import { Button, Icon, Table } from "semantic-ui-react";
import { Locale } from "../../../interfaces/locales";
import { useMutation, useQueryClient } from "react-query";
import { deleteLocale } from "../../../services/locale.service";

interface LocalesProps {
  locales: Locale[];
}

export const Locales = ({ locales }: LocalesProps) => {
  const { t } = useTranslation();

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (id?: string) => await deleteLocale(id),
    onSuccess: () => {
      queryClient.invalidateQueries("languages");
    },
  });

  return (
    <Table color="olive" columns={3}>
      <Table.Header>
        <Table.Row style={{ textAlign: "center" }}>
          <Table.HeaderCell>{t("Key")}</Table.HeaderCell>
          <Table.HeaderCell>{t("Value")}</Table.HeaderCell>
          <Table.HeaderCell>{t("Actions")}</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {locales?.map((locale: Locale) => (
          <Table.Row style={{ textAlign: "center" }} key={locale._id}>
            <Table.Cell>
              <p style={{ textTransform: "capitalize" }}>{t(locale.key)}</p>
            </Table.Cell>
            <Table.Cell>
              <p style={{ textTransform: "capitalize" }}>{locale.value}</p>
            </Table.Cell>
            <Table.Cell>
              <Button
                animated="vertical"
                color="red"
                size="small"
                onClick={() => mutation.mutate(locale._id)}
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
