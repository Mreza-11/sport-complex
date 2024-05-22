import React from "react";
import { Field, Form, Formik, ErrorMessage } from "formik";
import * as Yup from "yup";

interface CoachTeamFormProps {
  teamName: string;
  setTeamName: React.Dispatch<React.SetStateAction<string>>;
  handlePreviousStep: () => void;
  handleSubmit: () => void;
}

const CoachTeamForm: React.FC<CoachTeamFormProps> = ({
  teamName,
  setTeamName,
  handlePreviousStep,
  handleSubmit,
}) => {
  return (
    <Formik
      initialValues={{ teamName }}
      validationSchema={Yup.object({
        teamName: Yup.string().required("نام تیم الزامی است"),
      })}
      onSubmit={(values) => {
        setTeamName(values.teamName);
        handleSubmit();
      }}
    >
      <Form>
        <h2>نام تیم خود را وارد کنید</h2>
        <div>
          <Field type="text" name="teamName" />
          <ErrorMessage name="teamName" component="div" />
        </div>
        <button type="button" onClick={handlePreviousStep}>
          مرحله قبل
        </button>
        <button type="submit">ثبت نام</button>
      </Form>
    </Formik>
  );
};

export default CoachTeamForm;
