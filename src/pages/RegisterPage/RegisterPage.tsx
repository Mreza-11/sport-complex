import React, { useState } from "react";
import BasicInfoForm from "./BasicInfoForm";
import RoleSelectionForm from "./RoleSelectionForm";
import PlayerCoachesForm from "./PlayerCoachesForm";
import CoachTeamForm from "./CoachTeamForm";
import ChooseSessionsForm from "./ChooseSessionsForm";
import { User } from "../../types";

const RegisterPage: React.FC = () => {
  const [step, setStep] = useState(1);
  const [userData, setUserData] = useState<User>({
    id: "",
    fname: "",
    lname: "",
    city: "",
    age: 0,
    height: 0,
    weight: 0,
    username: "",
    password: "",
    sessions: [],
  });
  const [role, setRole] = useState<"player" | "coach">("player");
  const [favoriteCoaches, setFavoriteCoaches] = useState<string[]>([]);
  const [teamName, setTeamName] = useState("");
  const [selectedSessions, setSelectedSessions] = useState<string[]>([]);

  const handleNextStep = () => setStep((prev) => prev + 1);
  const handlePreviousStep = () => setStep((prev) => prev - 1);
  const handleSubmit = () => {
    // Handle final form submission logic
  };

  return (
    <div>
      {step === 1 && (
        <BasicInfoForm
          userData={userData}
          setUserData={setUserData}
          handleNextStep={handleNextStep}
        />
      )}
      {step === 2 && (
        <RoleSelectionForm
          role={role}
          setRole={setRole}
          handleNextStep={handleNextStep}
          handlePreviousStep={handlePreviousStep}
        />
      )}
      {step === 3 && role === "player" && (
        <PlayerCoachesForm
          favoriteCoaches={favoriteCoaches}
          setFavoriteCoaches={setFavoriteCoaches}
          handlePreviousStep={handlePreviousStep}
          handleSubmit={handleNextStep}
        />
      )}
      {step === 3 && role === "coach" && (
        <CoachTeamForm
          teamName={teamName}
          setTeamName={setTeamName}
          handlePreviousStep={handlePreviousStep}
          handleSubmit={handleNextStep}
        />
      )}
      {step === 4 && (
        <ChooseSessionsForm
          selectedSessions={selectedSessions}
          setSelectedSessions={setSelectedSessions}
          handlePreviousStep={handlePreviousStep}
          handleSubmit={handleSubmit}
        />
      )}
    </div>
  );
};

export default RegisterPage;
