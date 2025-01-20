import { useFormik } from "formik";
import { keys } from "lodash";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Form, Input, Select } from "semantic-ui-react";
import { Locale } from "../../../../interfaces/locales";
import { addLocale } from "../../../../services/locale.service";
import { initialValues, validationSchema } from "./LocaleForm.form";
import { getLanguages } from "../../../../services/languages.service";
import { Language } from "../../../../interfaces/languages";

export const LocaleForm = () => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const { lang } = useParams();
  const navigation = useNavigate();

  const { data: languages } = useQuery(
    "languages",
    async () => await getLanguages({ page: 1, limit: 100, query: "" })
  );

  const mutation = useMutation({
    mutationFn: (data: Locale) => addLocale(data),
    onSuccess: () => {
      queryClient.invalidateQueries("locales");
    },
  });

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(t),
    validateOnChange: false,
    onSubmit: (data: Locale) => {
      mutation.mutate(data);
      navigation(`/${lang}/locales`);
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
          id="value"
          name="value"
          control={Input}
          label={t("Value")}
          placeholder={t("Value")}
          onChange={formik.handleChange}
          value={formik.values.value}
        />
        <Form.Field>
          <label htmlFor="lang">{t("Language")}</label>
          <Select
            id="lang"
            name="lang"
            defaultValue={formik.values.lang}
            onChange={formik.handleChange}
            options={languages?.map((language: Language) => ({
              key: language._id,
              text: language.name,
              value: language.key,
            }))}
          />
        </Form.Field>
      </Form.Group>
      <Form.Button type="submit" color="olive">
        {t("Create")}
      </Form.Button>
    </Form>
  );
};
