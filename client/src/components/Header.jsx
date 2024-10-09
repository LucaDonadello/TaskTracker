import React from "react";

const Header = ({
  getCompletedIdeas,
  getInOnHoldIdeas,
  getInProgressIdeas,
  getIdeas,
}) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    window.location.href = '/login';
  };
  

  return (
    <div className="relative flex flex-col">
      <div className="flex justify-between items-center text-black py-6 px-8 md:px-8 bg-white drop-shadow-md">
        <div className="justify justify-left text-5xl font-serif">
          <p>Tasks Tracker</p>
        </div>
        <ul className="hidden xl:flex items-center gap-12 font-semibold text-base">
          <li
            className="p-3 hover:bg-indigo-700 hover:text-white rounded-md transition-all duration-200"
            onClick={() => getInOnHoldIdeas()}
          >
            On Hold
          </li>
          <li
            className="p-3 hover:bg-indigo-700 hover:text-white rounded-md transition-all duration-200"
            onClick={() => getInProgressIdeas()}
          >
            In Progress
          </li>
          <li
            className="p-3 hover:bg-indigo-700 hover:text-white rounded-md transition-all duration-200"
            onClick={() => getCompletedIdeas()}
          >
            Completed
          </li>
          <li
            className="p-3 hover:bg-indigo-700 hover:text-white rounded-md transition-all duration-200"
            onClick={() => getIdeas()}
          >
            All
          </li>
          <li className="p-3 hover:bg-indigo-700 hover:text-white rounded-md transition-all duration-200">
            <i className="bx bx-log-out text-2xl" onClick={handleLogout}></i>
          </li>
        </ul>
        <i
          className="bx bx-menu xl:hidden block text-5xl cursor-pointer"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        ></i>
      </div>

      {isMenuOpen && (
        <div
          className="xl:hidden w-full bg-white flex flex-col items-center gap-6 font-semibold text-lg transition-transform"
          style={{ transition: "transform 0.3s ease, opacity 0.3s ease" }}
        >
          <li
            className="list-none w-full text-center p-4 hover:bg-indigo-700 hover:text-white rounded-md transition-all cursor-pointer"
            onClick={() => getInOnHoldIdeas()}
          >
            On Hold
          </li>
          <li
            className="list-none w-full text-center p-4 hover:bg-indigo-700 hover:text-white rounded-md transition-all cursor-pointer"
            onClick={() => getInProgressIdeas()}
          >
            In Progress
          </li>
          <li
            className="list-none w-full text-center p-4 hover:bg-indigo-700 hover:text-white rounded-md transition-all cursor-pointer"
            onClick={() => getCompletedIdeas()}
          >
            Completed
          </li>
          <li
            className="list-none w-full text-center p-4 hover:bg-indigo-700 hover:text-white rounded-md transition-all cursor-pointer"
            onClick={() => getIdeas()}
          >
            All
          </li>
          <li className="list-none w-full text-center p-4 hover:bg-indigo-700 hover:text-white rounded-md transition-all cursor-pointer">
            <i className="bx bx-log-out text-2xl w-full text-center"
              onClick={handleLogout}></i>
          </li>
        </div>
      )}
    </div>
  );
};

export default Header;
