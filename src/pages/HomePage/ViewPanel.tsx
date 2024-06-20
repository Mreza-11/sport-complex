import React from "react";
import Button from "../../components/Button/Button";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { selectCurrentUser } from "../../store/authSlice";

interface ViewPanelProps {
  shuffleColors: () => void;
  setNewView: (newView: string) => void;
}

const ViewPanel: React.FC<ViewPanelProps> = ({ shuffleColors, setNewView }) => {
  const currentUser = useSelector((state: RootState) =>
    selectCurrentUser(state)
  );

  return (
    <div className="w-1/6 bg-gray-800 p-2 flex flex-col justify-around h-full">
      <Button onClick={() => setNewView("assignment")} color={"yellow"}>
        Weekly Table View
      </Button>
      <Button onClick={() => setNewView("graph")} color={"yellow"}>
        Graph View
      </Button>{" "}
      <Button onClick={() => setNewView("favoriteCoaches")} color={"yellow"}>
        favorite Coaches
      </Button>{" "}
      <Button onClick={() => setNewView("algorithmLog")} color={"yellow"}>
        algorithm Log
      </Button>
      <Button onClick={() => shuffleColors()} color={"yellow"}>
        Shuffle Colors
      </Button>
      {currentUser && currentUser?.role !== "admin" && (
        <>
          <Button onClick={() => setNewView("teamInfo")} color={"white"}>
            Team Info
          </Button>
          <Button onClick={() => setNewView("changeSessions")} color={"white"}>
            change Sessions
          </Button>
        </>
      )}
      {currentUser && currentUser?.role === "player" && (
        <Button onClick={() => setNewView("changeCoaches")} color={"white"}>
          change Coaches
        </Button>
      )}
    </div>
  );
};

export default ViewPanel;
