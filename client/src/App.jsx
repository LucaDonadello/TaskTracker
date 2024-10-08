import { Routes, Route } from "react-router-dom";
import { Header, Body, Login, Register, ProtectedRoute} from "./components";
import { useContext, useEffect, useState } from "react";
import AuthContext from "./context/AuthProvider";

const App = () => {
  const [ideas, setIdeas] = useState([]);
  const { auth } = useContext(AuthContext);

  const getIdeas = () => {
    fetch("/ideas")
      .then((res) => res.json())
      .then((data) => {
        const sortedIdeas = data.result.sort((a, b) => a.id - b.id);
        setIdeas(sortedIdeas);
      });
  };

  const getCompletedIdeas = () => {
    fetch("/ideas/completed")
      .then((res) => res.json())
      .then((data) => {
        const sortedIdeas = data.result.sort((a, b) => a.id - b.id);
        setIdeas(sortedIdeas);
      });
  };

  const getOnHoldIdeas = () => {
    fetch("/ideas/onHold")
      .then((res) => res.json())
      .then((data) => {
        const sortedIdeas = data.result.sort((a, b) => a.id - b.id);
        setIdeas(sortedIdeas);
      });
  };

  const getInProgressIdeas = () => {
    fetch("/ideas/inProgress")
      .then((res) => res.json())
      .then((data) => {
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
          <ProtectedRoute>
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
          </ProtectedRoute>
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