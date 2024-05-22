import React from "react";
import * as Yup from "yup";
import { Field, Form, Formik, ErrorMessage } from "formik";
import { User } from "../../types";

interface BasicInfoFormProps {
  userData: User;
  setUserData: React.Dispatch<React.SetStateAction<User>>;
  handleNextStep: () => void;
}

const BasicInfoForm: React.FC<BasicInfoFormProps> = ({
  userData,
  setUserData,
  handleNextStep,
}) => {
  return (
    <Formik
      initialValues={userData}
      validationSchema={Yup.object({
        fname: Yup.string().required("نام الزامی است"),
        lname: Yup.string().required("نام خانوادگی الزامی است"),
        city: Yup.string().required("شهر الزامی است"),
        age: Yup.number().required("سن الزامی است").min(10, "حداقل سن 10 سال"),
        height: Yup.number().required("قد الزامی است"),
        weight: Yup.number().required("وزن الزامی است"),
        username: Yup.string().required("نام کاربری الزامی است"),
        password: Yup.string().required("رمز عبور الزامی است"),
      })}
      onSubmit={(values) => {
        setUserData(values);
        handleNextStep();
      }}
    >
      <Form>
        <div>
          <label>نام</label>
          <Field type="text" name="fname" />
          <ErrorMessage name="fname" component="div" />
        </div>
        <div>
          <label>نام خانوادگی</label>
          <Field type="text" name="lname" />
          <ErrorMessage name="lname" component="div" />
        </div>
        <div>
          <label>شهر</label>
          <Field type="text" name="city" />
          <ErrorMessage name="city" component="div" />
        </div>
        <div>
          <label>سن</label>
          <Field type="number" name="age" />
          <ErrorMessage name="age" component="div" />
        </div>
        <div>
          <label>قد</label>
          <Field type="number" name="height" />
          <ErrorMessage name="height" component="div" />
        </div>
        <div>
          <label>وزن</label>
          <Field type="number" name="weight" />
          <ErrorMessage name="weight" component="div" />
        </div>
        <div>
          <label>نام کاربری</label>
          <Field type="text" name="username" />
          <ErrorMessage name="username" component="div" />
        </div>
        <div>
          <label>رمز عبور</label>
          <Field type="password" name="password" />
          <ErrorMessage name="password" component="div" />
        </div>
        <button type="submit">مرحله بعد</button>
      </Form>
    </Formik>
  );
};

export default BasicInfoForm;
