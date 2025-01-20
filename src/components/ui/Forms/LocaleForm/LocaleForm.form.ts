import { TFunction } from "i18next";
import * as Yup from "yup";

export function initialValues() {
  return {
    key: "",
    value: "",
    lang: "",
  };
}

export function validationSchema(t: TFunction) {
  return Yup.object().shape({
    key: Yup.string().required(t("Key required")),
    value: Yup.string().required(t("Value required")),
    lang: Yup.string().required(t("Language required")),
  });
}
