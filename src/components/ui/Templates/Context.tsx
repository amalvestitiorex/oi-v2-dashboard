import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import { Divider, Header, Icon, Popup } from "semantic-ui-react";
import { getContext } from "../../../services/context.service";
import { Context as IContext } from "../../../interfaces/context";
import { size } from "lodash";

export const Context = ({ id }: { id?: string }) => {
  const { t } = useTranslation();

  const { data: context } = useQuery(["context", id], () => getContext(id));

  console.log(context);

  if (size(context) === 0) return null;

  return (
    <div>
      <Header as={"h2"} dividing style={{ display: "flex", gap: 10 }}>
        {t("Context")}
        <div>
          <Popup
            header={t("Context")}
            content={t("Context of the record")}
            trigger={<Icon name="info circle" />}
          />
        </div>
      </Header>
      <div>
        {context?.map((c: IContext, index: number, array: IContext[]) => (
          <div key={c.id}>
            <Header as="h3">{c.name}</Header>
            <p>{c.description}</p>
            {array.length - 1 !== index && <Divider section />}
          </div>
        ))}
      </div>
    </div>
  );
};
