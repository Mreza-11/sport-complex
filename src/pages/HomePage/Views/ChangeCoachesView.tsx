import React, { useEffect, useState } from "react";
import { User } from "../../../types";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { selectCurrentUser } from "../../../store/authSlice";
import { useUsers } from "../../../hooks/useUsers";
import { useNavigate } from "react-router-dom";
import Input from "../../../components/Input/input";
import * as Yup from "yup";
import { Form, Formik } from "formik";

const ChangeCoachesView: React.FC = () => {
  const currentUser = useSelector((state: RootState) =>
    selectCurrentUser(state)
  ) as null | User;

  const { data: users, isLoading: usersIsLoading } = useUsers();

  const navigate = useNavigate();
  const [options, setOptions] = useState<
    { value: string | number; label: string }[]
  >([]);

  const initialValues = { coach_1: "", coach_2: "", coach_3: "" };
  const validationSchema = Yup.object({
    coach_1: Yup.string().required("Necessary"),
    coach_2: Yup.string().required("Necessary"),
    coach_3: Yup.string().required("Necessary"),
  });

  useEffect(() => {
    if (currentUser?.role !== "player") {
      navigate("/");
    }
    if (users !== undefined && !usersIsLoading) {
      const newOptions: { value: string | number; label: string }[] = [];
      users
        .filter((participant) => participant.role == "coach")
        .map((participant) =>
          newOptions.push({
            value: participant.id,
            label: participant.fName,
          })
        );

      setOptions(newOptions);
    }
  }, [usersIsLoading, users]);

  const onSubmit = (values: {
    coach_1: string;
    coach_2: string;
    coach_3: string;
  }) => {
    console.log(values);
  };

  return (
    <div className="h-5/6 w-screen">
      <div className="container mx-auto p-4">
        {" "}
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ errors, touched }) => (
            <Form className="space-y-6">
              <Input
                options={options}
                label="Choose Coach"
                name="coach_1"
                type="select"
                errors={errors}
                touched={touched}
              />{" "}
              <Input
                options={options}
                label="Choose Coach"
                name="coach_2"
                type="select"
                errors={errors}
                touched={touched}
              />{" "}
              <Input
                options={options}
                label="Choose Coach"
                name="coach_3"
                type="select"
                errors={errors}
                touched={touched}
              />
              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Submit Changes
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default ChangeCoachesView;
