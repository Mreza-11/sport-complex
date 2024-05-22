import React from "react";
import { Formik, Field, Form } from "formik";

interface RoleSelectionFormProps {
  role: "player" | "coach";
  setRole: React.Dispatch<React.SetStateAction<"player" | "coach">>;
  handleNextStep: () => void;
  handlePreviousStep: () => void;
}

const RoleSelectionForm: React.FC<RoleSelectionFormProps> = ({
  role,
  setRole,
  handleNextStep,
  handlePreviousStep,
}) => {
  return (
    <Formik
      initialValues={{ role }}
      onSubmit={(values) => {
        setRole(values.role);
        handleNextStep();
      }}
    >
      <Form>
        <h2>نقش خود را انتخاب کنید</h2>
        <div>
          <Field type="radio" id="player" name="role" value="player" />
          <label htmlFor="player">بازیکن</label>
        </div>
        <div>
          <Field type="radio" id="coach" name="role" value="coach" />
          <label htmlFor="coach">مربی</label>
        </div>
        <button type="button" onClick={handlePreviousStep}>
          مرحله قبل
        </button>
        <button type="submit">مرحله بعد</button>
      </Form>
    </Formik>
  );
};

export default RoleSelectionForm;
