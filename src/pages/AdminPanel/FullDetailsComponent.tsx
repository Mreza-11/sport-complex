import React from "react";
import { useUser } from "../../hooks/useUsers";
import { Coach, Player } from "../../types";

interface FullDetailsComponentProps {
  selectedUser: Player | Coach | null;
}

const FullDetailsComponent: React.FC<FullDetailsComponentProps> = ({
  selectedUser,
}) => {
  const userId = selectedUser ? selectedUser.userId : "";
  const { data: user, isLoading, isError } = useUser(userId);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-blue-500"></div>
      </div>
    );
  }

  if (isError || !user) {
    return (
      <div className="text-red-500 text-center">Error loading user details</div>
    );
  }

  return (
    <div className="p-4 border border-gray-300 rounded shadow-sm">
      <h2 className="text-2xl font-bold mb-4">User Details</h2>
      <p>
        <strong>ID:</strong> {user.id}
      </p>
      <p>
        <strong>Role:</strong> {user.role}
      </p>
      <p>
        <strong>Name:</strong> {user.fName} {user.lName}
      </p>
      <p>
        <strong>City:</strong> {user.city}
      </p>
      <p>
        <strong>Age:</strong> {user.age}
      </p>
      <p>
        <strong>Height:</strong> {user.height}
      </p>
      <p>
        <strong>Weight:</strong> {user.weight}
      </p>
      <p>
        <strong>Username:</strong> {user.username}
      </p>
      <p>
        <strong>Available Sessions:</strong>{" "}
        {user.availableSessionIds.join(", ")}
      </p>
    </div>
  );
};

export default FullDetailsComponent;
