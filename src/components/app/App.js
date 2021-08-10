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
    { color: "#09011A" },
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
  };
  const addTask = (listId, newTaskObj) => {
    const newArr = lists.map((item) => {
      if (item.id === listId) {
        item.tasks = [...item.tasks, newTaskObj];
      }
      return item;
    });
    setLists(newArr);
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

  return (
    <div className="todo__wrapper">
    <div  className="todo">
      <div className="app-sidebar">
        {lists ? (
          <Sidebar
            list={lists}
            addItem={addItem}
            removeItem={removeItem}
            colors={colors}
            className="todo__sidebar"
            onClickItem={(item) => {
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
            onEditTitle={onEditListTitle}
            tasks={activeItem}
            addTask={addTask}
            className="todo__content"
          />
        ) : (
          lists &&
          lists.map((list) => (
            <Content
              key={list.id}
              onEditTitle={onEditListTitle}
              tasks={list}
              addTask={addTask}
              className="todo__content"
            />
          ))
        )}
      </div>
    </div>
    </div>
  );
}

export default App;
