import React from "react";
import { ErrorMessage, Field, FormikTouched, useFormikContext } from "formik";
import {
  BasicInfoFormProps,
  ChooseSessionsFormProps,
  CoachTeamFormProps,
  LoginProps,
  SelectFavoriteCoachesFormProps,
  RoleSelectionFormProps,
  User,
} from "../../types";

interface InputProps {
  label?: string;
  name: string;
  type?:
    | "text"
    | "number"
    | "password"
    | "select"
    | "checkbox"
    | "file"
    | "radio";
  options?: { value: string | number; label: string }[];
  errors?: { [key: string]: any };
  touched?: FormikTouched<
    | LoginProps
    | BasicInfoFormProps
    | ChooseSessionsFormProps
    | CoachTeamFormProps
    | SelectFavoriteCoachesFormProps
    | RoleSelectionFormProps
    | User
    | {
        coach_1: string;
        coach_2: string;
        coach_3: string;
      }
  >;
  accept?: string;
}
const Input: React.FC<InputProps> = ({
  label,
  name,
  type = "text",
  options = [],
  errors = {},
  touched = {},
  accept,
}) => {
  const { setFieldValue } = useFormikContext();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.currentTarget.files) {
      setFieldValue(name, Array.from(event.currentTarget.files));
    }
  };

  return (
    <div className="my-4">
      {label && type !== "checkbox" && type !== "radio" && (
        <label htmlFor={name} className="block text-gray-700 font-bold mb-2">
          {label}
        </label>
      )}

      {type === "select" ? (
        <Field
          as="select"
          name={name}
          id={name}
          className="block w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:border-indigo-500 appearance-none"
        >
          <option value="" disabled>
            Choose Options
          </option>
          {options.map((option) => (
            <option key={Math.random()} value={option.value}>
              {option.label}
            </option>
          ))}
        </Field>
      ) : type === "file" ? (
        <div>
          <input
            id={name}
            name={name}
            type="file"
            multiple
            accept={accept}
            onChange={handleFileChange}
            className="block w-full text-gray-700 border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:border-indigo-500"
            aria-describedby={`${name}-error`}
          />
          <ErrorMessage
            name={name}
            component="div"
            className="text-red-500 text-xs mt-1"
            id={`${name}-error`}
          />
        </div>
      ) : (
        <Field
          name={name}
          id={name}
          type={type}
          className={`${
            type === "checkbox"
              ? "mr-2 leading-tight"
              : "block w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:border-indigo-500"
          }`}
        />
      )}
      {type === "checkbox" && label && (
        <label htmlFor={name} className="text-gray-700 font-bold">
          {label}
        </label>
      )}
      {touched && errors[name] && (
        <div className="text-red-500 text-xs mt-1">{errors[name]}</div>
      )}
    </div>
  );
};

export default Input;
