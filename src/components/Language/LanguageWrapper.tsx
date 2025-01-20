import { useTranslation } from "react-i18next";
import { Outlet, useParams } from "react-router-dom";

export const LanguageWrapper = () => {
  const { lang } = useParams();
  const { i18n } = useTranslation();

  if (lang && i18n.language !== lang) {
    i18n.changeLanguage(lang);
  }

  return <Outlet />;
};
