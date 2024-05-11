import { useState, useRef, useContext, useEffect } from "react";
import axios from "../axios";
import { toast } from "react-hot-toast";
import { UserContext } from "../../context/UserContext";

const TodoList = () => {
  const { user, loading } = useContext(UserContext);
  const todoRef = useRef();
  const [isLoading, setIsLoading] = useState(true);
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        if (!loading && user && user.token) {
          const response = await axios.get("/api/todo", {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          });

          setTodos(response.data);
        } else if (!loading && !user) {
          toast.error("Not authenticated");
          navigate("/");
        } else {
          setIsLoading(false);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchTask();
  }, [loading, user]);

  const hanldeDelete = async (id) => {
    const taskId = id;
    try {
      const { data } = await axios.delete(`/api/todo/${taskId}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      if (data.success) {
        toast.success(data.success);
        setTodos(todos.filter((todo) => todo._id !== taskId));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddTask = async (e) => {
    e.preventDefault();
    const payload = {
      task: todoRef.current.value,
    };

    try {
      const { data } = await axios.post("/api/todo", payload, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      if (data.success) {
        toast.success(data.success);
        setTodos((todos) => [...todos, data.data]);
        todoRef.current.value = "";
      } else if (data.message) {
        toast.error(data.message);
        todoRef.current.value = "";
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="container-fluid d-flex flex-column justify-content-center align-items-center">
        <div className="row">
          <div className="col">
            <h1 className="todo-list-title mt-5 mb-5">Todo List</h1>
          </div>
        </div>

        <div className="row">
          <div className="col">
            <form
              onSubmit={handleAddTask}
              className="todo-form d-flex aling-items-center"
            >
              <input type="text" placeholder="Enter Task" ref={todoRef} />
              <input
                type="submit"
                placeholder="Submit"
                className="todo-submit-btn btn btn-outline-secondary"
              />
            </form>
          </div>
        </div>

        <div className="row todos-container">
          <div className="col">
            <ul className="todo-list-container">
              {isLoading ? (
                <div className="loader-container">
                  <div className="loader"></div>
                  <div className="loader-text">Loading...</div>
                </div>
              ) : todos.length === 0 ? (
                <p className="card-is-empty text-center mt-5">Task is empty</p>
              ) : (
                todos.map((todo, index) => (
                  <li key={index} className="todo-list-items">
                    <div className="row">
                      <div className="col-10">
                        <span className="text">{todo.task}</span>
                      </div>
                      <div className="col">
                        <button
                          className="delete-todo-btn btn btn-danger"
                          onClick={() => hanldeDelete(todo._id)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </li>
                ))
              )}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default TodoList;
