import { useFormik } from "formik";
import { keys } from "lodash";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { Form, Input } from "semantic-ui-react";
import { Language } from "../../../../interfaces/languages";
import { addLanguage } from "../../../../services/languages.service";
import { initialValues, validationSchema } from "./LanguageForm.form";
import { useNavigate, useParams } from "react-router-dom";

export const LanguageForm = () => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const { lang } = useParams();
  const navigation = useNavigate();

  const mutation = useMutation({
    mutationFn: (data: Language) => addLanguage(data),
    onSuccess: () => {
      queryClient.invalidateQueries("languages");
    },
  });

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(t),
    validateOnChange: false,
    onSubmit: (data: Language) => {
      mutation.mutate(data);
      navigation(`/${lang}/languages`);
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
          id="key"
          name="key"
          control={Input}
          label={t("Key")}
          placeholder={t("Key")}
          onChange={formik.handleChange}
          value={formik.values.key}
        />
        <Form.Field
          id="name"
          name="name"
          control={Input}
          label={t("Name")}
          placeholder={t("Name")}
          onChange={formik.handleChange}
          value={formik.values.name}
        />
      </Form.Group>
      <Form.Button type="submit" color="olive">
        {t("Create")}
      </Form.Button>
    </Form>
  );
};
