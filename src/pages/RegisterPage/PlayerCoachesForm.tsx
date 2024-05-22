import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { Field, Form, Formik } from "formik";
import { db } from "../../firebaseConfig";

interface PlayerCoachesFormProps {
  favoriteCoaches: string[];
  setFavoriteCoaches: React.Dispatch<React.SetStateAction<string[]>>;
  handlePreviousStep: () => void;
  handleSubmit: () => void;
}

const PlayerCoachesForm: React.FC<PlayerCoachesFormProps> = ({
  favoriteCoaches,
  setFavoriteCoaches,
  handlePreviousStep,
  handleSubmit,
}) => {
  const [coaches, setCoaches] = useState<any[]>([]);

  useEffect(() => {
    const fetchCoaches = async () => {
      const querySnapshot = await getDocs(collection(db, "coaches"));
      const coachesData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCoaches(coachesData);
    };

    fetchCoaches();
  }, []);

  return (
    <Formik
      initialValues={{ favoriteCoaches }}
      onSubmit={(values) => {
        setFavoriteCoaches(values.favoriteCoaches);
        handleSubmit();
      }}
    >
      <Form>
        <h2>مربیان مورد علاقه خود را انتخاب کنید</h2>
        {coaches.map((coach) => (
          <div key={coach.id}>
            <Field
              type="checkbox"
              id={coach.id}
              name="favoriteCoaches"
              value={coach.id}
              as="input"
            />
            <label htmlFor={coach.id}>
              {coach.fname} {coach.lname}
            </label>
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

export default PlayerCoachesForm;
