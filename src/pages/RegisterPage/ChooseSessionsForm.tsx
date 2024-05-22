import React from "react";
import { Formik, Field, Form } from "formik";

interface ChooseSessionsFormProps {
  selectedSessions: string[];
  setSelectedSessions: React.Dispatch<React.SetStateAction<string[]>>;
  handlePreviousStep: () => void;
  handleSubmit: () => void;
}

const sessions = [
  { day: "شنبه", time: "صبح" },
  { day: "شنبه", time: "عصر" },
  { day: "یک‌شنبه", time: "صبح" },
  { day: "یک‌شنبه", time: "عصر" },
  { day: "دوشنبه", time: "صبح" },
  { day: "دوشنبه", time: "عصر" },
  { day: "سه‌شنبه", time: "صبح" },
  { day: "سه‌شنبه", time: "عصر" },
  { day: "چهارشنبه", time: "صبح" },
  { day: "چهارشنبه", time: "عصر" },
  { day: "پنج‌شنبه", time: "صبح" },
  { day: "پنج‌شنبه", time: "عصر" },
  { day: "جمعه", time: "صبح" },
  { day: "جمعه", time: "عصر" },
];

const ChooseSessionsForm: React.FC<ChooseSessionsFormProps> = ({
  selectedSessions,
  setSelectedSessions,
  handlePreviousStep,
  handleSubmit,
}) => {
  return (
    <Formik
      initialValues={{ sessions: selectedSessions }}
      onSubmit={(values) => {
        setSelectedSessions(values.sessions);
        handleSubmit();
      }}
    >
      <Form>
        <h2>جلسات موجود خود را انتخاب کنید</h2>
        {sessions.map((session, index) => (
          <div key={index}>
            <Field
              type="checkbox"
              id={`${session.day}-${session.time}`}
              name="sessions"
              value={`${session.day}-${session.time}`}
            />
            <label
              htmlFor={`${session.day}-${session.time}`}
            >{`${session.day} ${session.time}`}</label>
          </div>
        ))}
        <button type="button" onClick={handlePreviousStep}>
          مرحله قبل
        </button>
        <button type="submit">ثبت نام</button>
      </Form>
    </Formik>
  );
};

export default ChooseSessionsForm;
