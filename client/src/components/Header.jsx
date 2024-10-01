import React from "react";

const Header = ({
  getCompletedIdeas,
  getInOnHoldIdeas,
  getInProgressIdeas,
  getIdeas,
}) => {
  return (
    <div className="bg-indigo-800 flex justify-between p-6">
      <div className="flex justify-left mb-6 text-5xl font-serif text-white">
        <p>Ideas Tracker</p>
      </div>
      <div className="justify-between space-x-4">
        <button
          className="text-2xl bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-2 border border-gray-400 rounded shadow"
          onClick={() => getInOnHoldIdeas()}
        >
          On Hold
        </button>
        <button
          className="text-2xl bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-2 border border-gray-400 rounded shadow"
          onClick={() => getInProgressIdeas()}
        >
          In Progres
        </button>
        <button
          className="text-2xl bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-2 border border-gray-400 rounded shadow"
          onClick={() => getCompletedIdeas()}
        >
          Completed
        </button>
        <button
          className="text-2xl bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-2 border border-gray-400 rounded shadow"
          onClick={() => getIdeas()}
        >
          All
        </button>
      </div>
    </div>
  );
};

export default Header;
