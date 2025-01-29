import { useTranslation } from "react-i18next";
import { Header, Icon, Popup } from "semantic-ui-react";

interface LinksProps {
  links?: {
    title: string;
    url: string;
  }[];
}

export const Links = ({ links }: LinksProps) => {
  const { t } = useTranslation();

  return (
    <div>
      <Header as={"h2"} dividing style={{ display: "flex", gap: 10 }}>
        {t("Sources consulted")}
        <div>
          <Popup
            header={t("Sources consulted")}
            content={t("Links to the sources consulted")}
            trigger={<Icon name="info circle" />}
          />
        </div>
      </Header>
      <div>
        {links?.map((link, index) => (
          <a key={index} href={link.url} target="_blank">
            {link.title}
          </a>
        ))}
      </div>
    </div>
  );
};
