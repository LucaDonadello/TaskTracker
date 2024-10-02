import React, { useState } from "react";

const Body = ({ ideas, deleteIdea, editIdea, addIdea }) => {
  const [visibleIdeaId, setVisibleIdeaId] = useState(null);
  const [editedDescriptions, setEditedDescriptions] = useState({});

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
    console.log(idea);
    if (editedDescriptions[idea.id]) {
      editIdea(idea.id, {
        title: idea.title,
        status: idea.status,
        ideaDesc: editedDescriptions[idea.id],
      });
    }
    toggleVisibility(idea.id);
  };

  const handleAdd = () => {
    addIdea({
      title: "New Idea",
      status: "In Progress",
      ideaDesc: "Placeholder description",
    });
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
                <div className="text-lg">{idea.title}</div>
                <div className="flex items-center gap-5">
                  <div
                    className={`text-sm font-semibold px-2 py-2 rounded ${
                      idea.status === "Completed"
                        ? "bg-green-100 text-green-800"
                        : idea.status === "On Hold"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-blue-100 text-blue-800"
                    }`}
                  >
                    {idea.status}
                  </div>
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
                    value={editedDescriptions[idea.id] || idea.ideadesc}
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
