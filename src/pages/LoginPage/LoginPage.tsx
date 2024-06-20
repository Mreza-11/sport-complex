// LoginPage.tsx
import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import useLogin from "../../hooks/useLogin";
import Input from "../../components/Input/input";
import { LoginProps } from "../../types";

const LoginPage = () => {
  const initialValues: LoginProps = { username: "", password: "" };

  const validationSchema = Yup.object({
    username: Yup.string().required("نام کاربری الزامی است"),
    password: Yup.string().required("رمز عبور الزامی است"),
  });

  const { mutate: handleSubmit, isLoading } = useLogin();

  const onSubmit = (values: LoginProps) => {
    handleSubmit(values);
  };

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ errors, touched }) => (
            <Form className="space-y-6">
              <Input
                label="نام کاربری"
                name="username"
                type="text"
                errors={errors}
                touched={touched}
              />
              <Input
                label="رمز عبور"
                name="password"
                type="password"
                errors={errors}
                touched={touched}
              />
              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  {isLoading ? "در حال بارگذاری..." : "ورود"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default LoginPage;
