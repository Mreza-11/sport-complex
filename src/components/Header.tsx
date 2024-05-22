import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Header: React.FC = () => {
  const { currentUser } = useAuth();

  return (
    <header className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">مدیریت مجتمع ورزشی</h1>
        <nav>
          <Link to="/" className="mr-4">
            خانه
          </Link>
          {currentUser ? (
            <>
              <Link to="/choose-sessions" className="mr-4">
                انتخاب جلسات
              </Link>
              <Link to="/coach-requests" className="mr-4">
                درخواست‌ها
              </Link>
            </>
          ) : (
            <>
              <Link to="/login" className="mr-4">
                ورود
              </Link>
              <Link to="/register" className="mr-4">
                ثبت نام
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
