import React, { useState } from "react";

const Body = ({ ideas, deleteIdea, editIdea, addIdea }) => {
  const handleEdit = (idea) => {
    const newTitle = prompt("Enter new title:", idea.title);
    const newStatus = prompt(
      "Enter new status (Completed, In Progress, On Hold):",
      idea.status
    );
    const newDesc = prompt("Enter new description:", idea.ideadesc);

    if (
      newTitle &&
      newStatus &&
      ["Completed", "In Progress", "On Hold"].includes(newStatus)
    ) {
      editIdea(idea.id, {
        title: newTitle,
        status: newStatus,
        ideaDesc: newDesc,
      });
    } else {
      alert("Invalid input. Please ensure all fields are filled correctly.");
    }
  };

  const handleAdd = () => {
    const title = prompt("Enter title:");
    const status = prompt("Enter status (Completed, In Progress, On Hold):");
    const ideaDesc = prompt("Enter description:");

    if (
      title &&
      status &&
      ideaDesc &&
      ["Completed", "In Progress", "On Hold"].includes(status)
    ) {
      addIdea({ title, status, ideaDesc });
    } else {
      alert("Invalid input. Please ensure all fields are filled correctly.");
    }
  };

  const [visibleIdeaId, setVisibleIdeaId] = useState(null);

  const toggleVisibility = (id) => {
    setVisibleIdeaId(visibleIdeaId === id ? null : id);
  };

  return (
    <div className="p-4">
      <div className="p-4">
        <div className="flex justify-between">
          <p className="text-4xl font-bold mb-4">Ideas: </p>
          <button
            className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
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
                      className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-1 px-2 border-b-4 border-blue-700 hover:border-blue-500 rounded"
                      onClick={() => toggleVisibility(idea.id)}
                    >
                      {visibleIdeaId === idea.id
                        ? "Hide Description"
                        : "See Description"}
                    </button>
                    <button
                      className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-1 px-2 border-b-4 border-blue-700 hover:border-blue-500 rounded"
                      onClick={() => handleEdit(idea)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-1 px-2 border-b-4 border-blue-700 hover:border-blue-500 rounded"
                      onClick={() => deleteIdea(idea.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
              {/* Conditional rendering */}
              {visibleIdeaId === idea.id && (
                <div className="mt-4">
                  <div>
                    {idea.ideadesc}
                  </div>
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
