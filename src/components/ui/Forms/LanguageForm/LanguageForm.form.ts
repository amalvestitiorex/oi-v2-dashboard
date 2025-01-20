import { TFunction } from "i18next";
import * as Yup from "yup";

export function initialValues() {
  return {
    key: "",
    name: "",
  };
}

export function validationSchema(t: TFunction) {
  return Yup.object().shape({
    key: Yup.string().required(t("Key required")),
    name: Yup.string().required(t("Name required")),
  });
}
