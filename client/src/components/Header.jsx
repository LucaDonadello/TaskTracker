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
          className="text-2xl bg-white hover:bg-grey-100 text-grey-800 font-semibold py-2 px-2 border-b-4 border-grey-600 rounded shadow active:bg-gray-300 active:border-grey-600 active:border-b-2 transition-all duration-200"
          onClick={() => getInOnHoldIdeas()}
        >
          On Hold
        </button>
        <button
          className="text-2xl bg-white hover:bg-grey-100 text-grey-800 font-semibold py-2 px-2 border-b-4 border-grey-600 rounded shadow active:bg-gray-300 active:border-grey-600 active:border-b-2 transition-all duration-200"
          onClick={() => getInProgressIdeas()}
        >
          In Progres
        </button>
        <button
          className="text-2xl bg-white hover:bg-grey-100 text-grey-800 font-semibold py-2 px-2 border-b-4 border-grey-600 rounded shadow active:bg-gray-300 active:border-grey-600 active:border-b-2 transition-all duration-200"
          onClick={() => getCompletedIdeas()}
        >
          Completed
        </button>
        <button
          className="text-2xl bg-white hover:bg-grey-100 text-grey-800 font-semibold py-2 px-2 border-b-4 border-grey-600 rounded shadow active:bg-gray-300 active:border-grey-600 active:border-b-2 transition-all duration-200"
          onClick={() => getIdeas()}
        >
          All
        </button>
      </div>
    </div>
  );
};

export default Header;
