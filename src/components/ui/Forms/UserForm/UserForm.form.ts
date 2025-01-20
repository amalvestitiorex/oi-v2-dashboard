import * as Yup from "yup";
import { User } from "../../../../interfaces/users";
import { TFunction } from "i18next";

export interface UserFormValues extends User {
  passwordConfirmation?: string;
}

export function initialValues(user?: UserFormValues) {
  return {
    name: user?.name ? user.name : "",
    email: user?.email ? user.email : "",
    password: "",
    passwordConfirmation: "",
    base_url: user?.base_url ? user.base_url : "",
    api_url: user?.api_url ? user.api_url : "",
    koha_id: user?.koha_id ? user.koha_id : "",
    role: user?.role ? user.role : "",
  };
}

export function validationSchema(t: TFunction, user?: User) {
  return Yup.object().shape({
    name: Yup.string().required(t("Name required")),
    email: Yup.string().email(t("Invalid email")).required(t("Email required")),
    password: user?.name
      ? Yup.string()
      : Yup.string().required(t("Password required")),
    passwordConfirmation: user?.name
      ? Yup.string()
      : Yup.string()
          .oneOf([Yup.ref("password")], t("Passwords must match"))
          .required(t("Password confirmation required")),
    base_url: Yup.string().required(t("Base URL required")),
    api_url: Yup.string().required(t("Api URL required")),
    koha_id: Yup.string().required(t("Koha ID required")),
    role: Yup.string().required(t("Role required")),
  });
}
