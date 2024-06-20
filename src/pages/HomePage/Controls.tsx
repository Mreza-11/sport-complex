import React from "react";
import Button from "../../components/Button/Button";
import ToggleSwitch from "../../components/Button/ToggleSwitch";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { selectCurrentUser } from "../../store/authSlice";

interface ControlsProps {
  showSteps: boolean;
  setShowSteps: React.Dispatch<React.SetStateAction<boolean>>;
  handleAlgorithm: (algorithm: string) => void;
  shuffleFavoriteCoaches: () => void;
  shuffleSessionIds: () => void;
  handleReset: () => void;
  postToDatabase: () => void;
}

const Controls: React.FC<ControlsProps> = ({
  showSteps,
  setShowSteps,
  handleAlgorithm,
  shuffleFavoriteCoaches,
  shuffleSessionIds,
  handleReset,
  postToDatabase,
}) => {
  const currentUser = useSelector((state: RootState) =>
    selectCurrentUser(state)
  );

  return (
    <div className="w-1/6 bg-gray-800 p-2 flex flex-col justify-around h-full">
      <ToggleSwitch
        label="Show Steps"
        color="blue"
        initialChecked={showSteps}
        onToggle={setShowSteps}
      />
      <Button onClick={shuffleFavoriteCoaches} color={"green"}>
        Shuffle Favorite Coaches
      </Button>
      <Button onClick={shuffleSessionIds} color={"green"}>
        Shuffle SessionIds
      </Button>
      <Button onClick={handleReset} color={"green"}>
        Reset Assignments
      </Button>
      <Button onClick={() => handleAlgorithm("DFS")} color={"blue"}>
        DFS
      </Button>
      <Button onClick={() => handleAlgorithm("BT")} color={"blue"}>
        BT
      </Button>
      <Button onClick={() => handleAlgorithm("BT + MRV")} color={"blue"}>
        BT + MRV
      </Button>
      <Button onClick={() => handleAlgorithm("BT + MRV + LCV")} color={"blue"}>
        BT + MRV + LCV
      </Button>

      {currentUser?.role == "admin" && (
        <Button onClick={postToDatabase} color={"black"}>
          Post to Database
        </Button>
      )}
    </div>
  );
};

export default Controls;
