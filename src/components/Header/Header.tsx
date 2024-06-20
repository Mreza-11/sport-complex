import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout, selectCurrentUser } from "../../store/authSlice";
import { RootState } from "../../store/store";
import { User } from "../../types";
import Button from "../Button/Button";

const Header: React.FC = () => {
  const currentUser = useSelector((state: RootState) =>
    selectCurrentUser(state)
  ) as null | User;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <header className="bg-gray-800 text-white p-3">
      <div className="container mx-auto flex justify-start items-center space-x-2">
        <Button color="blue" onClick={() => navigate("/")}>
          Home
        </Button>
        {currentUser ? (
          <>
            {currentUser.role === "admin" && (
              <Button color="blue" onClick={() => navigate("/admin-panel")}>
                Admin Panel
              </Button>
            )}
            <Button color="red" onClick={handleLogout}>
              Logout
            </Button>
          </>
        ) : (
          <Button color="blue" onClick={() => navigate("/login")}>
            Login
          </Button>
        )}
      </div>
    </header>
  );
};

export default Header;
