import { useFormik } from "formik";
import { keys } from "lodash";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useMutation, useQueryClient } from "react-query";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Form, Input, Select } from "semantic-ui-react";
import { RootState } from "../../../../redux/store";
import { updateUser } from "../../../../services/users.service";
import {
  initialValues,
  UserFormValues,
  validationSchema,
} from "./UserForm.form";

interface UserFormProps {
  user?: UserFormValues;
}

export const UserForm = ({ user }: UserFormProps) => {
  const { user: userState } = useSelector((state: RootState) => state.auth);
  const { t } = useTranslation();
  const { lang } = useParams();
  const queryClient = useQueryClient();
  const navigation = useNavigate();

  const mutation = useMutation({
    mutationFn: ({ id, data }: { id?: string; data?: UserFormValues }) =>
      updateUser(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries("users");
    },
  });

  const formik = useFormik({
    initialValues: initialValues(user),
    validationSchema: validationSchema(t, user),
    validateOnChange: false,
    onSubmit: (data: UserFormValues) => {
      mutation.mutate({ id: user?._id, data });
      navigation(`/${lang}/users`);
    },
  });

  useEffect(() => {
    keys(formik.errors).forEach((key) => {
      toast.error((formik.errors as Record<string, string>)[key]);
    });
  }, [formik.errors]);

  return (
    <Form onSubmit={formik.handleSubmit}>
      <Form.Group widths="equal">
        <Form.Field
          id="name"
          name="name"
          control={Input}
          label={t("Name")}
          placeholder={t("Name")}
          onChange={formik.handleChange}
          value={formik.values.name}
        />
        <Form.Field
          id="email"
          name="email"
          control={Input}
          type="email"
          label={t("Email")}
          placeholder={t("Email")}
          onChange={formik.handleChange}
          value={formik.values.email}
        />
        <Form.Field>
          <label htmlFor="role">Rol</label>
          <Select
            id="role"
            name="role"
            defaultValue={formik.values.role}
            onChange={formik.handleChange}
            disabled={userState?.role === "user"}
            options={[
              { key: "user", text: "Usuario", value: "user" },
              { key: "admin", text: "Admin", value: "admin" },
            ]}
          />
        </Form.Field>
      </Form.Group>
      <Form.Group widths="equal">
        <Form.Field
          id="password"
          name="password"
          control={Input}
          type="password"
          label={t("Password")}
          placeholder={t("Password")}
          onChange={formik.handleChange}
          value={formik.values.password}
        />
        <Form.Field
          id="passwordConfirmation"
          name="passwordConfirmation"
          control={Input}
          type="password"
          label={t("Password confirmation")}
          placeholder={t("Password confirmation")}
          onChange={formik.handleChange}
          value={formik.values.passwordConfirmation}
        />
      </Form.Group>
      <Form.Group widths="equal">
        <Form.Field
          id="base_url"
          name="base_url"
          control={Input}
          label={t("Base URL")}
          placeholder={t("Base URL")}
          onChange={formik.handleChange}
          value={formik.values.base_url}
        />
        <Form.Field
          id="api_url"
          name="api_url"
          control={Input}
          label={t("Api URL")}
          placeholder={t("Api URL")}
          onChange={formik.handleChange}
          value={formik.values.api_url}
        />
        <Form.Field
          id="koha_id"
          name="koha_id"
          control={Input}
          label={t("Koha ID")}
          placeholder={t("Koha ID")}
          onChange={formik.handleChange}
          value={formik.values.koha_id}
        />
      </Form.Group>
      <Form.Button type="submit" color="olive">
        {user?.name ? t("Save") : t("Create")}
      </Form.Button>
    </Form>
  );
};
