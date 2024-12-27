import { useFormik } from "formik";
import { Form, Segment } from "semantic-ui-react";
import { initialValues, validationSchema } from "./LoginForm.form";
import "./LoginForm.module.css";
import { useDispatch, useSelector } from "react-redux";
import { authThunk } from "../../../redux/thunks/auth.thunk";
import { AppDispatch, RootState } from "../../../redux/store";
import { useEffect } from "react";
import { toast } from "react-toastify";

export const LoginForm = () => {
  const { loading } = useSelector((state: RootState) => state.auth);
  const dispatch: AppDispatch = useDispatch();

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: (values) => {
      dispatch(authThunk(values));
    },
  });

  useEffect(() => {
    if (formik.errors.email) {
      toast.error(formik.errors.email);
    }
    if (formik.errors.password) {
      toast.error(formik.errors.password);
    }
  }, [formik.errors]);

  return (
    <Form onSubmit={formik.handleSubmit} loading={loading} size="large">
      <Segment color="olive">
        <Form.Input
          name="email"
          id="email"
          fluid
          icon="user"
          iconPosition="left"
          placeholder="E-mail address"
          onChange={formik.handleChange}
          value={formik.values.email}
          error={formik.errors.email ? true : false}
        />
        <Form.Input
          name="password"
          id="password"
          fluid
          icon="lock"
          iconPosition="left"
          placeholder="Password"
          type="password"
          onChange={formik.handleChange}
          value={formik.values.password}
          error={formik.errors.password ? true : false}
        />
        <Form.Button type="submit" color="olive" fluid size="large">
          Login
        </Form.Button>
      </Segment>
    </Form>
  );
};
