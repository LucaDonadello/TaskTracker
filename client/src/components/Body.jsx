import React, { useState } from "react";

const Body = ({ ideas, deleteIdea, editIdea, addIdea }) => {
  const [visibleIdeaId, setVisibleIdeaId] = useState(null);
  const [editedDescriptions, setEditedDescriptions] = useState({});
  const [selectedStatuses, setSelectedStatuses] = useState({});
  const [editedTitle, setEditedTitle] = useState({});
  const [menuOpenId, setIsMenuOpen] = useState(null);

  const options = [
    { value: "In Progress", label: "In Progress" },
    { value: "On Hold", label: "On Hold" },
    { value: "Completed", label: "Completed" },
  ];

  const toggleVisibility = (id) => {
    setVisibleIdeaId(visibleIdeaId === id ? null : id);
  };

  const toggleVisibilityMenu = (id) => {
    setIsMenuOpen(menuOpenId === id ? null : id);
  };

  const handleDescriptionChange = (id, newDescription) => {
    setEditedDescriptions((prev) => ({
      ...prev,
      [id]: newDescription,
    }));
  };

  const handleSaveDescription = (idea) => {
    const updatedIdea = {
      title: editedTitle[idea.id] || idea.title,
      status: idea.status,
      ideaDesc: editedDescriptions[idea.id] || idea.ideadesc,
    };

    editIdea(idea.id, updatedIdea);
    toggleVisibility(idea.id);
  };

  const handleAdd = () => {
    addIdea({
      title: "New Idea",
      status: "In Progress",
      ideaDesc: "Placeholder description",
    });
  };

  const handleStatusChange = (idea, newStatus) => {
    setSelectedStatuses((prev) => ({
      ...prev,
      [idea.id]: newStatus,
    }));
    const updatedIdea = ideas.find((i) => i.id === idea.id);
    editIdea(idea.id, {
      ...updatedIdea,
      status: newStatus,
      ideaDesc: idea.ideadesc,
    });
  };

  const handleTitleChange = (idea, newTitle) => {
    setEditedTitle((prev) => ({
      ...prev,
      [idea.id]: newTitle,
    }));
  };

  return (
    <div className="p-4">
      <div className="grid grid-cols-1 gap-4">
        {ideas.map((idea) => (
          <div
            key={idea.id}
            className="p-4 border rounded-lg shadow-md bg-white"
          >
            <div className="flex justify-between items-center">
              <input
                value={
                  editedTitle[idea.id] !== undefined
                    ? editedTitle[idea.id]
                    : idea.title
                }
                onClick={() => toggleVisibility(idea.id)}
                onChange={(e) => handleTitleChange(idea, e.target.value)}
                type="text"
                id={idea.id}
                className="text-lg text-black w-full max-w-xs"
              />
              <div className="flex items-center ">
                <select
                  className={`text-sm font-semibold px-2 py-2 rounded ${
                    (selectedStatuses[idea.id] || idea.status) === "Completed"
                      ? "bg-green-100 text-green-800"
                      : (selectedStatuses[idea.id] || idea.status) === "On Hold"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-blue-100 text-blue-800"
                  }`}
                  value={selectedStatuses[idea.id] || idea.status}
                  onChange={(e) => handleStatusChange(idea, e.target.value)}
                >
                  {options.map((option) => (
                    <option
                      key={option.value}
                      value={option.value}
                      className="text-sm font-semibold px-2 py-2 rounded bg-white text-black"
                    >
                      {option.label}
                    </option>
                  ))}
                </select>
                <div className="hidden md:flex gap-1 pl-2">
                  <button
                    className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-1 px-2 border-b-4 border-blue-700 hover:border-blue-500 rounded active:bg-blue-300 active:border-blue-600 active:border-b-2 transition-all duration-200"
                    onClick={() => toggleVisibility(idea.id)}
                  >
                    {visibleIdeaId === idea.id
                      ? "Hide Description"
                      : "See Description"}
                  </button>
                  <button
                    className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-1 px-2 border-b-4 border-blue-700 hover:border-blue-500 rounded active:bg-blue-300 active:border-blue-600 active:border-b-2 transition-all duration-200"
                    onClick={() => deleteIdea(idea.id)}
                  >
                    Delete
                  </button>
                </div>
                <i
                  className="bx bx-menu-alt-right md:hidden block text-3xl cursor-pointer px"
                  onClick={() => toggleVisibilityMenu(idea.id)}
                ></i>
              </div>
            </div>
            {visibleIdeaId === idea.id && (
              <div className="mt-4">
                <textarea
                  className="border rounded p-2 w-full"
                  rows="4"
                  value={
                    editedDescriptions[idea.id] !== undefined
                      ? editedDescriptions[idea.id]
                      : idea.ideadesc
                  }
                  onChange={(e) =>
                    handleDescriptionChange(idea.id, e.target.value)
                  }
                />
                <button
                  className="mt-2 bg-green-600 hover:bg-green-800 text-white font-bold py-1 px-2 rounded"
                  onClick={() => handleSaveDescription(idea)}
                >
                  Save
                </button>
              </div>
            )}
            {menuOpenId === idea.id && (
              <div
                className="xl:hidden w-full bg-white flex flex-col items-center gap-6 font-semibold rounded text-lg transition-transform py-4"
                style={{
                  transition: "transform 0.3s ease, opacity 0.3s ease",
                }}
              >
                <li
                  className="list-none w-full text-center p-4 hover:bg-indigo-700 hover:text-white rounded-md transition-all cursor-pointer"
                  onClick={() => toggleVisibility(idea.id)}
                >
                  {visibleIdeaId === idea.id
                    ? "Hide Description"
                    : "See Description"}
                </li>
                <li
                  className="list-none w-full text-center p-4 hover:bg-indigo-700 hover:text-white rounded-md transition-all cursor-pointer"
                  onClick={() => deleteIdea(idea.id)}
                >
                  Delete
                </li>
              </div>
            )}
          </div>
        ))}
      </div>
      <div
        className={`${
          ideas.length === 0
            ? "flex flex-col items-center justify-center min-h-screen"
            : ""
        }`}
      >
        {ideas.length === 0 ? (
          <div className="text-center text-3xl text-white">No Task found</div>
        ) : null}
        <div className={`py-3 ${ideas.length === 0 ? "text-center" : ""}`}>
          <button
            className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-1 px-2 border-b-4 border-blue-700 hover:border-blue-500 rounded active:bg-blue-300 active:border-blue-600 active:border-b-2 transition-all duration-200"
            onClick={handleAdd}
          >
            ADD TASK
          </button>
        </div>
      </div>
    </div>
  );
};

export default Body;
