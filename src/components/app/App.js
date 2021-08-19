import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.scss";
import Sidebar from "../sidebar/Sidebar";
import Content from "../content/Content";
import Spinner from "../Spinner/Spinner";

function App() {
  const colors = [
    { color: "#C9D1D3" },
    { color: "#42B883" },
    { color: "#64C4ED" },
    { color: "#FFBBCC" },
    { color: "#B6E6BD" },
    { color: "#C355F5" },
    { color: "#fdbb2d" },
    { color: "#FF6464" },
  ];
  const [lists, setLists] = useState(null);
  const [activeItem, setActiveItem] = useState(null);
  const [activeAllTasks, setActiveAllTasks] = useState(true);

  useEffect(() => {
    axios.get(" http://localhost:3001/lists?_embed=tasks").then(({ data }) => {
      setLists(data);
    });
  }, []);

  const addItem = (newItem) => {
    const newArr = [...lists, newItem];
    setLists(newArr);
    setActiveAllTasks(true)

  };
  const addTask = (listId, newTaskObj) => {
    const newArr = lists.map((item) => {
      if (item.id === listId) {
        item.tasks = [...item.tasks, newTaskObj];
      }
      return item;
    });
    setLists(newArr);
    axios.get(" http://localhost:3001/lists?_embed=tasks").then(({ data }) => {
      setLists(data);
    });
    setActiveAllTasks(true)

  };

  const removeItem = (id) => {
    const index = lists.findIndex((elem) => elem.id === id);
    const before = lists.slice(0, index);
    const after = lists.slice(index + 1);
    const newArr = [...before, ...after];
    setLists(newArr);
    axios.delete("http://localhost:3001/lists/" + id).catch(() => {
      alert("error while deleting list");
    });
  };

  const onEditListTitle = (id, label) => {
    const newArr = lists.map((item) => {
      if (item.id === id) {
        item.label = label;
      }
      return item;
    });
    setLists(newArr);
  };

  const onRemoveTask = (listId, taskId) => {
    if (window.confirm("are you sure ...")) {
      console.log(listId + "|" + taskId);
      const newArr = lists.map((item) => {
        if (item.id === listId) {
          item.tasks = item.tasks.filter((task) => task.id !== taskId);
        }
        return item;
      });
      setLists(newArr);

      axios.delete(`http://localhost:3001/tasks/${taskId}`).catch(() => {
        alert("failed to delete task");
      });
    }
  };

  const onEditTask = (listId, taskObj) => {
    const { text, id } = taskObj;
    console.log(listId + "|" + id + "|" + text);

    const newTaskText = window.prompt("...new text...", text);
    if (!newTaskText) {
      return;
    }
    const newArr = lists.map((item) => {
      if (item.id === listId) {
        item.tasks = item.tasks.map((task) => {
          if (task.id === id) {
            task.text = newTaskText;
          }
          return task;
        });
      }
      return item;
    });
    setLists(newArr);

    axios
      .patch(`http://localhost:3001/tasks/${id}`, { text: newTaskText })
      .catch(() => {
        alert("failed to rename");
      });
  };

  const onCompleteTask = (listId, taskId, completed) => {
    const newArr = lists.map((item) => {
      if (item.id === listId) {
        item.tasks = item.tasks.map((task) => {
          if (task.id === taskId) {
            task.completed = completed;
          }
          return task;
        });
      }
      return item;
    });
    setLists(newArr);

    axios
      .patch(`http://localhost:3001/tasks/${taskId}`, { completed })
      .catch(() => {
        alert("failed to rename");
      });

  };

  return (
    <div className="todo__wrapper">
      <div className="todo">
        <div className="app-sidebar">
          {lists ? (
            <Sidebar
              setLists={setLists}
              list={lists}
              addItem={addItem}
              removeItem={removeItem}
              colors={colors}
              className="todo__sidebar"
              onClickItem={(item) => {
                if (!item) {
                  setActiveItem(null);
                }
                setActiveItem(item);
                if (activeAllTasks === true) {
                  setActiveAllTasks(!activeAllTasks);
                }
              }}
              activeItem={activeItem}
              setActiveAllTasks={setActiveAllTasks}
              activeAllTasks={activeAllTasks}
            />
          ) : (
            <Spinner />
          )}
        </div>
        <div className="app-content">
          {!activeAllTasks ? (
            <Content
              tasks={activeItem}
              // _____
              setLists={setLists}
              // _____
              onEditTitle={onEditListTitle}
              onRemoveTask={onRemoveTask}
              onEditTask={onEditTask}
              addTask={addTask}
              onCompleteTask={onCompleteTask}
              // _____
              className="todo__content"
            />
          ) : (
            lists &&
            lists.map((list) => (
              <Content
                tasks={list}
                // _____
                setLists={setLists}
                // _____
                onEditTitle={onEditListTitle}
                onRemoveTask={onRemoveTask}
                onEditTask={onEditTask}
                addTask={addTask}
                onCompleteTask={onCompleteTask}
                // _____
                className="todo__content"
                key={list.id}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
