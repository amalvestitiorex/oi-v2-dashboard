import { useTranslation } from "react-i18next";
import { Statistic as Stats } from "semantic-ui-react";
import { Statics } from "../../interfaces/statics";

interface StatisticProps {
  statics: Statics;
}

export const Statistic = ({ statics }: StatisticProps) => {
  const { t } = useTranslation();

  return (
    <Stats.Group color="olive">
      <Stats>
        <Stats.Value>{statics.records}</Stats.Value>
        <Stats.Label>{t("Records")}</Stats.Label>
      </Stats>
      <Stats>
        <Stats.Value>{statics.users}</Stats.Value>
        <Stats.Label>{t("Users")}</Stats.Label>
      </Stats>
      <Stats>
        <Stats.Value>{statics.translations}</Stats.Value>
        <Stats.Label>{t("Translations")}</Stats.Label>
      </Stats>
      <Stats>
        <Stats.Value>{statics.languages}</Stats.Value>
        <Stats.Label>{t("Languages")}</Stats.Label>
      </Stats>
      <Stats>
        <Stats.Value>{statics.locales}</Stats.Value>
        <Stats.Label>{t("Locales")}</Stats.Label>
      </Stats>
    </Stats.Group>
  );
};
