import React, { useState } from "react";

const Body = ({ ideas, deleteIdea, editIdea, addIdea }) => {
  const [visibleIdeaId, setVisibleIdeaId] = useState(null);
  const [editedDescriptions, setEditedDescriptions] = useState({});
  const [selectedStatuses, setSelectedStatuses] = useState({});
  const [editedTitle, setEditedTitle] = useState({});

  const options = [
    { value: "In Progress", label: "In Progress" },
    { value: "On Hold", label: "On Hold" },
    { value: "Completed", label: "Completed" },
  ];

  const toggleVisibility = (id) => {
    setVisibleIdeaId(visibleIdeaId === id ? null : id);
  };

  const handleDescriptionChange = (id, newDescription) => {
    setEditedDescriptions((prev) => ({
      ...prev,
      [id]: newDescription,
    }));
  };

  const handleSaveDescription = (idea) => {
    const updatedIdea = {
      title: editedTitle[idea.id] || idea.title, // Use the edited title if it exists
      status: idea.status,
      ideaDesc: editedDescriptions[idea.id] || idea.ideadesc,
    };

    editIdea(idea.id, updatedIdea); // Save the updated idea
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
      <div className="p-4">
        <div className="flex justify-between">
          <p className="text-4xl font-bold mb-4">Ideas: </p>
          <button
            className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-1 px-2 border-b-4 border-blue-700 hover:border-blue-500 rounded active:bg-blue-300 active:border-blue-600 active:border-b-2 transition-all duration-200"
            onClick={handleAdd}
          >
            ADD IDEA
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {ideas.length === 0 ? (
          <div className="text-center text-2xl">No ideas found</div>
        ) : (
          ideas.map((idea) => (
            <div
              key={idea.id}
              className="p-4 border rounded-lg shadow-md bg-white"
            >
              <div className="flex justify-between items-center">
                <input
                  value={editedTitle[idea.id] !== undefined ? editedTitle[idea.id] : idea.title}
                  onClick={() => toggleVisibility(idea.id)}
                  onChange={(e) => handleTitleChange(idea, e.target.value)}
                  type="text"
                  id={idea.id}
                  className="text-lg text-black"
                />
                <div className="flex items-center gap-5">
                  <select
                    className={`text-sm font-semibold px-2 py-2 rounded ${
                      (selectedStatuses[idea.id] || idea.status) === "Completed"
                        ? "bg-green-100 text-green-800"
                        : (selectedStatuses[idea.id] || idea.status) ===
                          "On Hold"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-blue-100 text-blue-800"
                    }`}
                    value={selectedStatuses[idea.id] || idea.status}
                    onChange={(e) => handleStatusChange(idea, e.target.value)}
                  >
                    {options.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  <div className="flex gap-1">
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
                </div>
              </div>
              {visibleIdeaId === idea.id && (
                <div className="mt-4">
                  <textarea
                    className="border rounded p-2 w-full"
                    rows="4"
                    value={editedDescriptions[idea.id] !== undefined ? editedDescriptions[idea.id] : idea.ideadesc}
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
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Body;