import { Routes, Route } from "react-router-dom";
import { Header, Body, Login, Register } from "./components";
import { useEffect, useState } from "react";

const App = () => {
  const [ideas, setIdeas] = useState([]);

  const getIdeas = () => {
    fetch("/ideas")
      .then((res) => res.json())
      .then((data) => {
        // Sort the ideas by id
        const sortedIdeas = data.result.sort((a, b) => a.id - b.id);
        setIdeas(sortedIdeas);
      });
  };

  const getCompletedIdeas = () => {
    fetch("/ideas/completed")
      .then((res) => res.json())
      .then((data) => {
        // Sort the ideas by id
        const sortedIdeas = data.result.sort((a, b) => a.id - b.id);
        setIdeas(sortedIdeas);
      });
  };

  const getOnHoldIdeas = () => {
    fetch("/ideas/onHold")
      .then((res) => res.json())
      .then((data) => {
        // Sort the ideas by id
        const sortedIdeas = data.result.sort((a, b) => a.id - b.id);
        setIdeas(sortedIdeas);
      });
  };

  const getInProgressIdeas = () => {
    fetch("/ideas/inProgress")
      .then((res) => res.json())
      .then((data) => {
        // Sort the ideas by id
        const sortedIdeas = data.result.sort((a, b) => a.id - b.id);
        setIdeas(sortedIdeas);
      });
  };

  const deleteIdea = (id) => {
    fetch(`/ideas/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((resp) => {
        // Change based on which ideas are being displayed
        getIdeas();
      });
  };

  const editIdea = (id, updatedIdea) => {
    fetch(`/ideas/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedIdea),
    })
      .then((res) => res.json())
      .then((resp) => {
        // Change based on which ideas are being displayed
        getIdeas();
      });
  };

  const addIdea = (newIdea) => {
    fetch("/ideas", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newIdea),
    })
      .then((res) => res.json())
      .then((resp) => {
        // Change based on which ideas are being displayed
        getIdeas();
      });
  };

  useEffect(() => {
    getIdeas();
  }, []);

  return (
    <Routes>
      <Route
        path="/tracker"
        element={
          <div className="w-full min-h-screen absolute bg-gradient-to-r from-blue-400 to-emerald-400">
            <Header
              getCompletedIdeas={getCompletedIdeas}
              getInOnHoldIdeas={getOnHoldIdeas}
              getInProgressIdeas={getInProgressIdeas}
              getIdeas={getIdeas}
            />
            <Body
              ideas={ideas}
              deleteIdea={deleteIdea}
              editIdea={editIdea}
              addIdea={addIdea}
            />
          </div>
        }
      />
      <Route
        path="/login"
        element={
          <div className="w-full min-h-screen absolute bg-gradient-to-r from-blue-400 to-emerald-400">
            <Login />
          </div>
        }
      />
      <Route
        path="/register"
        element={
          <div className="w-full min-h-screen absolute bg-gradient-to-r from-blue-400 to-emerald-400">
            <Register />
          </div>
        }
      />
    </Routes>
  );
};

export default App;
